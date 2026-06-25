import { useEffect, useState } from 'react'

/**
 * PROBLEM 06 — Debounced search
 *
 * Tests setTimeout/clearTimeout knowledge + useEffect cleanup.
 *
 * Props: onSearch(query)  — called with the query AFTER the user stops typing.
 *
 * Requirements (see SearchBox.test.jsx):
 *  - Controlled input with placeholder "Search".
 *  - onSearch must fire 300ms AFTER the last keystroke (debounced), not on every key.
 *  - Typing again within 300ms resets the timer (only the final value fires once).
 *  - Clean up the pending timer on unmount / re-run (clearTimeout in the effect).
 */
export default function SearchBox({ onSearch, delay = 300 }) {
  const [query, setQuery] = useState('')

  // TODO: useEffect that debounces calling onSearch(query) by `delay` ms,
  //       and returns a cleanup that clears the timer.
  // 
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [query, delay, onSearch])

  return (
    <input
      placeholder="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
