// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

const setupConnection = async (selectedDB: string, selectedcollection: string) => {
    const client = await MongoClient.connect('mongodb+srv://pasteu008:admin@cluster0.arcwbve.mongodb.net/')
    const db = client.db(selectedDB)
    const collection = db.collection(selectedcollection)

    return collection
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        try {
            const featuredEvents = await query(req.body.year, req.body.month)

            res.status(201).json({ featuredEvents })
        } catch (e: any) {
            res.status(400).json({ success: false, error: e.message })
        }
    }
}

const query = async (year: string, month: string) => {
    const collection = await setupConnection('NextEvents', 'events')
    const result = await collection.aggregate([
        {
            $set: {
                filterDate: {
                    $concat: [
                        {
                            $convert: {
                                input: {
                                    $year: {
                                        $convert: {
                                            input: "$date", to: "date"
                                        }
                                    }
                                },
                                to: "string"
                            }
                        }, '-',
                        {
                            $convert: {
                                input: {
                                    $month: {
                                        $convert: {
                                            input: "$date", to: "date"
                                        }
                                    }
                                },
                                to: "string"
                            }
                        }
                    ]
                }
            }
        },
        {
            $match: {
                filterDate: `${year}-${month}`
            }
        },
        {
            $unset: 'filterDate'
        }
    ]).toArray()

    return result
}