import classes from '@/styles/Home.module.css'
import { useRouter } from 'next/router'

const BlogsPage = () => {
    const router= useRouter()
    console.log(router.query)

    return (
        <div>
            <h1 className={classes.userWelcome}>Blog page</h1>
        </div>
    )
}

export default BlogsPage