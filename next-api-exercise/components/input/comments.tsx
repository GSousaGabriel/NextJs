import { useContext, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '@/store/notification-context';

function Comments(props: { eventComment: string }) {
  const { eventComment } = props;
  const [showComments, setShowComments] = useState(false);
  const notificationCtx = useContext(NotificationContext)

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData: any) {
    notificationCtx.showNotification({
      title: 'Publishing...',
      message: 'Publishing your comment...',
      status: 'pending'
    })
    try {
      const response = await fetch('/api/events/comments', {
        method: 'POST',
        body: JSON.stringify({
          eventComment,
          ...commentData
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Comment published!/',
          status: 'success'
        })
      } else {
        throw Error('Comment failed')
      }
    } catch (e) {
      notificationCtx.showNotification({
        title: 'Failed!',
        message: (e as Error).message || 'Failed to comment',
        status: 'error'
      })
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList eventId={eventComment} />}
    </section>
  );
}

export default Comments;