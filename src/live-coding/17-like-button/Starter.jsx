import { useState } from 'react'

// Live coding 17 — Like button with optimistic update. Build from CHALLENGE.md.
export default function LikeButton({ initialCount = 0, initialLiked = false, onToggle }) {
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [pending, setPending] = useState(false)

  // TODO: optimistic flip + count adjust, await onToggle, rollback on error.

  return (
    <button data-testid="like-button" aria-pressed={liked} disabled={pending}>
      {liked ? '♥' : '♡'} <span data-testid="like-count">{count}</span>
    </button>
  )
}
