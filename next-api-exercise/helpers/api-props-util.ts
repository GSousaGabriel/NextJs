import { MongoClient } from "mongodb"

const setupConnection = async (selectedDB: string, selectedcollection: string) => {
    const client = await MongoClient.connect('mongodb+srv://pasteu008:admin@cluster0.arcwbve.mongodb.net/')
    const db = client.db(selectedDB)
    const collection = db.collection(selectedcollection)

    return collection
}

export async function getAllEvents() {
    const collection = await setupConnection('NextEvents', 'events')
    const events = await collection.find().toArray()

    return events;
}

export async function getFeaturedEvents() {
    const collection = await setupConnection('NextEvents', 'events')
    const events = collection.find({ isFeatured: true }).toArray()

    return events;
}