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

// Live coding 8 — Nested Comments. Build from CHALLENGE.md.
// Hint: write a Comment component that renders itself for each reply.
export default function CommentTree({ comments = COMMENTS }) {
  // TODO: render comments recursively with a collapse toggle.
  return <div>{/* TODO */}</div>
}
