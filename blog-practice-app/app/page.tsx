import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getAllPosts } from "@/lib/posts-util";
// import { MongoClient } from "mongodb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gabriel's blog",
    description: 'I post about web development and general programming'
}

export default async function Home() {
  // const client = await MongoClient.connect('mongodb+srv://pasteu008:admin@cluster0.b98kvq5.mongodb.net/')
  // const db = client.db('Blog')
  // const collection = db.collection('posts')
  // const data = JSON.stringify((await collection.find().toArray()))

  const data = getAllPosts()

  console.log(data)

  "use client"
  return (
    <>
      <Hero />
      <FeaturedPosts posts={data} />
    </>
  )
}