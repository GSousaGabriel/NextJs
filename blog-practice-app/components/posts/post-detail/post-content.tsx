// import { MongoClient } from 'mongodb'

"use client"
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import classes from './post-content.module.css'
import PostHeader from './post-header'
import Image from 'next/image'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'

SyntaxHighlighter.registerLanguage('js', js)

export default function PostContent(props: { post: IPost }) {
    const { post } = props
    // const client = await MongoClient.connect('mongodb+srv://pasteu008:admin@cluster0.b98kvq5.mongodb.net/')
    // const db = client.db('Blog')
    // const collection = db.collection('posts')
    // const data = JSON.stringify((await collection.find().toArray()))
    const customRenderers = {
        // img(image: any) {
        //     return <Image src={`/images/posts/${image.src}`} alt={image.alt} width={600} height={300}/>
        // },
        p(paragraph: any) {
            const { node } = paragraph
            if (node.children[0].tagName === "img") {
                const image = node.children[0]

                return (
                    <div className={classes.image}>
                        <Image src={`/images/posts/${image.properties.src}`} alt={image.alt} width={600} height={300} />
                    </div>
                )
            }
            return <p>{paragraph.children}</p>
        },
        code(code: any) {
            const { className, children } = code;
            const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
            console.log(children)
            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={language}>
                    {children}
                </SyntaxHighlighter>
            );
        },
    }


    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={`/images/posts/${post.image}`} />
            <ReactMarkdown components={customRenderers}>{post.content as string}</ReactMarkdown>
        </article>
    )
}