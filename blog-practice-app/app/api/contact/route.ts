import { MongoClient } from "mongodb"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email, name, message } = body
    let client

    if (!email || !email.includes("@") || !name || name.trim() === "" || !message || message.trim() === "") {

        return new Response(JSON.stringify({ message: 'Invalid input ' + message }), {
            status: 422
        })
    }

    try {
        client = await MongoClient.connect(`mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@${process.env.dbCluster}.b98kvq5.mongodb.net/`)
    } catch (e) {
        return new Response(JSON.stringify({ message: (e as Error).message }), {
            status: 500
        })
    }

    const newMessage = {
        email,
        name,
        message
    }

    try {
        const db = client.db(process.env.db)
        const collection = db.collection('messages')
        const data = await collection.insertOne(newMessage)

        client.close()
        return new Response(JSON.stringify({ message: 'Successfully stored message!' }), {
            status: 201
        })
    } catch (e) {
        return new Response(JSON.stringify({ message: (e as Error).message }), {
            status: 500
        })
    }
}