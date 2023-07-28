import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";
// import { MongoClient } from "mongodb";

export default async function Posts() {
    // const client = await MongoClient.connect('mongodb+srv://pasteu008:admin@cluster0.b98kvq5.mongodb.net/')
    // const db = client.db('Blog')
    // const collection = db.collection('posts')
    // const data = JSON.stringify((await collection.find().toArray()))
    const feature= getAllPosts()
     

    console.log(feature)

    "use client"
    return <AllPosts posts={feature} />
}