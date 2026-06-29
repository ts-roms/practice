import { useState } from 'react'

const FRUITS = ['Apple', 'Apricot', 'Avocado', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Mango']

export default function Typeahead({ options = FRUITS }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)

  const suggestions = query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : []
  const showList = open && suggestions.length > 0

  const onChange = (e) => {
    setQuery(e.target.value)
    setOpen(true)
    setActive(-1)
  }

  const select = (value) => {
    setQuery(value)
    setOpen(false)
    setActive(-1)
  }

  const onKeyDown = (e) => {
    if (!showList) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (a + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a - 1 + suggestions.length) % suggestions.length)
    } else if (e.key === 'Enter') {
      if (active >= 0) select(suggestions[active])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div style={{ position: 'relative', width: 240 }}>
      <input
        value={query}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Search fruit"
        style={{ width: '100%' }}
      />
      {showList && (
        <ul role="listbox" style={{ listStyle: 'none', margin: 0, padding: 0, border: '1px solid #ccc' }}>
          {suggestions.map((s, i) => (
            <li
              key={s}
              role="option"
              aria-selected={i === active}
              onMouseDown={() => select(s)} // mousedown beats input blur
              style={{ padding: '4px 8px', background: i === active ? '#eef' : '#fff', cursor: 'pointer' }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
