import Link from 'next/link'
import classes from './post-item.module.css'
import Image from 'next/image'

export default function PostItem(props: { key: string, post: IPost }) {
    const { _id, image, title, date, excerpt } = props.post

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <li className={classes.post}>
            <Link href={`/posts/${_id.toString()}`}>
                <div className={classes.image}>
                    <Image src={`/images/posts/${image}`} alt={title} width={300} height={200} layout='responsive' />
                </div>
                <div className={classes.content}>
                    <h3>{title}</h3>
                    <time>{formattedDate}</time>
                    <p>{excerpt}</p>
                </div>
            </Link>
        </li>
    )
}