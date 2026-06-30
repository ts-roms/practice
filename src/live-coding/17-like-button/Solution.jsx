import { useState } from 'react'

export default function LikeButton({ initialCount = 0, initialLiked = false, onToggle }) {
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [pending, setPending] = useState(false)

  const handleClick = async () => {
    const prevLiked = liked
    const prevCount = count
    const nextLiked = !liked

    // optimistic update
    setLiked(nextLiked)
    setCount((c) => c + (nextLiked ? 1 : -1))
    setPending(true)

    try {
      await onToggle?.(nextLiked)
    } catch {
      // rollback to the captured previous state
      setLiked(prevLiked)
      setCount(prevCount)
    } finally {
      setPending(false)
    }
  }

  return (
    <button data-testid="like-button" aria-pressed={liked} disabled={pending} onClick={handleClick}>
      {liked ? '♥' : '♡'} <span data-testid="like-count">{count}</span>
    </button>
  )
}
