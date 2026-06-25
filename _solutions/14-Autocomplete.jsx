import { useState, useEffect, useRef } from 'react'

export default function Autocomplete({ fetchSuggestions, onSelect, delay = 300 }) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const skipNextFetch = useRef(false)

  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false
      return
    }
    if (!query) {
      setItems([])
      setOpen(false)
      return
    }
    let cancelled = false
    const id = setTimeout(async () => {
      const res = await fetchSuggestions(query)
      if (cancelled) return
      setItems(res)
      setActive(-1)
      setOpen(true)
    }, delay)
    return () => {
      cancelled = true
      clearTimeout(id)
    }
  }, [query, delay, fetchSuggestions])

  const choose = (value) => {
    skipNextFetch.current = true
    setQuery(value)
    setItems([])
    setOpen(false)
    onSelect?.(value)
  }

  const onKeyDown = (e) => {
    if (!open || items.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (a + 1) % items.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a - 1 + items.length) % items.length)
    } else if (e.key === 'Enter') {
      if (active >= 0) choose(items[active])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div>
      <input
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {open && items.length > 0 && (
        <ul role="listbox">
          {items.map((it, i) => (
            <li
              key={it}
              role="option"
              aria-selected={i === active}
              data-active={i === active}
              onClick={() => choose(it)}
            >
              {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
