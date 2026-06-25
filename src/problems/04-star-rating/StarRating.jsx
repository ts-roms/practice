import { useState } from 'react'

/**
 * PROBLEM 04 — Star rating
 *
 * Props: count (number of stars, default 5), onChange?(value)
 *
 * Requirements (see StarRating.test.jsx):
 *  - Render `count` star buttons, each role="button" with aria-label="Star N" (1-based).
 *  - Clicking star N sets the rating to N and calls onChange(N).
 *  - A star is "filled" when its index <= current rating: give it
 *    data-filled="true" (else "false").
 *  - Hovering star N previews fill up to N WITHOUT committing the rating
 *    (mouse leave restores the committed rating).
 */
export default function StarRating({ count = 5, onChange }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  // TODO: compute the "active" level = hover || rating, render `count` stars.
  const active = hover || rating;

  const handleClick = (value) => {
    setRating(value);
    onChange?.(value);
  }
  return (
    <div onMouseLeave={() => setHover(0)}>
      {/* TODO: render star buttons */}
      {Array.from({ length: count }, (_, index) => {
        const value = index + 1;
        return (
          <button
            key={value}
            role="button"
            aria-label={`Star ${value}`}
            data-filled={value <= active}
            onClick={() => handleClick(value)}
            onMouseEnter={() => setHover(value)}
          >

            *
          </button>
        )
        
      })}
    </div>
  )
}
