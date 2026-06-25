import { useEffect, useState } from 'react'

export default function SearchBox({ onSearch, delay = 300 }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const id = setTimeout(() => onSearch?.(query), delay)
    return () => clearTimeout(id)
  }, [query, delay, onSearch])

  return (
    <input
      placeholder="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
