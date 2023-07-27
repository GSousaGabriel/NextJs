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

    if (req.method === "POST") {
        try {
            const commentData = req.body
            const newComment = await collection.insertOne({
                ...commentData,
                eventId: new ObjectId(commentData.eventComment)
            })

            res.status(202).json({ newComment })
        } catch (e: any) {
            res.status(400).json({ success: false, error: e.message })
        }
    }
}