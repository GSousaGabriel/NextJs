import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsPath = path.join(process.cwd(), 'content', 'posts')

export function getPostFiles(){
    return fs.readdirSync(postsPath)
}

export function getPostData(fileName: string) {
    const postSlug = fileName.replace(/\.md$/, '')
    const filePath = path.join(postsPath, `${postSlug}.md`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    const postData = {
        ...data as IPost,
        _id: postSlug,
        content
    }

    return postData
}

export function getAllPosts() {
    const postFiles = getPostFiles()
    const allPosts = postFiles.map((postFile: string) => {
        return getPostData(postFile)
    })
    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1)

    return sortedPosts
}

export function getFeaturedPosts() {
    const AllPosts = getAllPosts()
    const featuredPosts = AllPosts.filter((post: IPost) => post.isFeatured)

    return featuredPosts
}