// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, MongoClientOptions } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const email = req.body.email
        const client = await MongoClient.connect('mongodb+srv://pasteu008:admin@cluster0.arcwbve.mongodb.net/')
        const db = client.db('newsletter')
        const collection = db.collection('subscribers')
        const hasUser = await collection.findOne({ email })

        if (!hasUser) {
            try {
                await collection.insertOne({ email })
                res.status(201).json({ success: true, message: 'User subscribed!' })
            } catch (e: any) {
                res.status(400).json({ success: false, error: e.message })
            }
        }

        res.status(202).json({ success: true, message: 'User already subscribed!' })
    }
}