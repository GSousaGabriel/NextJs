import { useEffect, useState } from 'react';
import classes from './comment-list.module.css';
import useSWR from 'swr';

function CommentList(props: { eventId: string }) {
  const { eventId } = props
  const [comments, setComments] = useState<IComment[] | null>(null)

  const fetcher = async (url: string) => {
    const response = await fetch(url)
    const data = await response.json()
    return data.comments
  }

  const { data, error } = useSWR<IComment[]>(
    '/api/events/comments/' + eventId,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setComments(data)
    }
  }, [data])

  if (!comments) {
    return <p>Loading...</p>
  }

  if (comments.length === 0) {
    return <p>No comments Found!</p>
  }

  return (
    <ul className={classes.comments}>
      {comments!.map((comment: IComment) => (
        <li key={comment._id.toString()}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;