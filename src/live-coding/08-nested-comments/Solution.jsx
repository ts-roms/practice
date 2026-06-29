import { useState } from 'react'

const COMMENTS = [
  {
    id: 1,
    text: 'Great article!',
    replies: [
      { id: 2, text: 'Agreed.', replies: [{ id: 3, text: 'Same here.', replies: [] }] },
      { id: 4, text: 'Thanks for sharing.', replies: [] },
    ],
  },
  { id: 5, text: 'I have a question…', replies: [] },
]

function Comment({ comment }) {
  const [open, setOpen] = useState(true)
  const hasReplies = comment.replies && comment.replies.length > 0

  return (
    <div data-testid={`comment-${comment.id}`} style={{ marginLeft: 16, borderLeft: '2px solid #eee', paddingLeft: 10 }}>
      <p style={{ margin: '4px 0' }}>{comment.text}</p>
      {hasReplies && (
        <>
          <button onClick={() => setOpen((o) => !o)}>
            {open ? 'Hide' : 'Show'} replies ({comment.replies.length})
          </button>
          {open && comment.replies.map((reply) => <Comment key={reply.id} comment={reply} />)}
        </>
      )}
    </div>
  )
}

export default function CommentTree({ comments = COMMENTS }) {
  return (
    <div>
      {comments.map((c) => (
        <Comment key={c.id} comment={c} />
      ))}
    </div>
  )
}
