import PostItem from './post-item'
import classes from './posts-grid.module.css'

export default function PostsGrid(props: { posts: IPost[] }) {
    const { posts } = props

    return (
        <ul className={classes.grid}>
            {posts.map((post) => (
                <PostItem key={post._id.toString()} post={post} />
            ))}
        </ul>
    )
}