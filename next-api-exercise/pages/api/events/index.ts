// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const client = await MongoClient.connect('mongodb+srv://pasteu008:admin@cluster0.arcwbve.mongodb.net/')
    const db = client.db('NextEvents')
    const collection = db.collection('events')

    if (req.method === "GET") {
        try {
            const isFeatured = req.query.featured
            console.log(isFeatured)
            const featuredEvents = collection.find({ isFeatured })
            res.status(201).json({ featuredEvents })
        } catch (e: any) {
            res.status(400).json({ success: false, error: e.message })
        }
    }
}