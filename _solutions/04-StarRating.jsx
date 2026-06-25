import { useState } from 'react'

export default function StarRating({ count = 5, onChange }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const active = hover || rating

  const select = (n) => {
    setRating(n)
    onChange?.(n)
  }

  return (
    <div>
      {Array.from({ length: count }, (_, idx) => {
        const value = idx + 1
        return (
          <button
            key={value}
            aria-label={`Star ${value}`}
            data-filled={value <= active}
            onClick={() => select(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
          >
            {value <= active ? '★' : '☆'}
          </button>
        )
      })}
    </div>
  )
}
