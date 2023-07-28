import classes from './all-posts.module.css'
import PostsGrid from './posts-grid'

export default function AllPosts(props: { posts: IPost[] }) {
    return (
        <section className={classes.posts}>
            <h1>All posts</h1>
            <PostsGrid posts={props.posts} />
        </section>
    )
}