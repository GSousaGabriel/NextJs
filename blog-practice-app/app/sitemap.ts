import { MongoClient } from "mongodb";

export default async function sitemap() {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@${process.env.dbCluster}.b98kvq5.mongodb.net/`)
    const db = client.db(process.env.db)
    const collection = db.collection('posts')
    const data = await collection.find().toArray()

    const posts = data.map((post) => (
        {
            url: `${process.env.siteUrl}/posts/${post._id.toString()}`,
            lastModified: new Date().toISOString()
        })
    )

    const routes = ['', '/posts', 'contact'].map((route) => (
        {
            url: `${process.env.siteUrl}${route}`,
            lastModified: new Date().toISOString()
        })
    )

    return [...routes, ...posts]
}