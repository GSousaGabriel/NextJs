// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const client = await MongoClient.connect('mongodb+srv://pasteu008:admin@cluster0.arcwbve.mongodb.net/')
    const db = client.db('NextEvents')
    const collection = db.collection('comments')

    if (req.method === "GET") {
        try {
            const eventId = req.query.eventId as string
            console.log(eventId)
            const comments = await collection.find({eventId: new ObjectId(eventId)}).sort({_id: -1}).toArray()

            res.status(200).json({ comments })
        } catch (e: any) {
            res.status(400).json({ success: false, error: e.message })
        }
    }
}