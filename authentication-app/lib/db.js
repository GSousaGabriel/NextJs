import { MongoClient } from 'mongodb'

export async function connectToClient() {
    const client = await MongoClient.connect('mongodb+srv://pasteu008:admin@cluster0.b98kvq5.mongodb.net/')
    return client
}