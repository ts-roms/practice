import { useState, useRef, useEffect } from 'react'

const ITEMS = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' },
  { id: 4, name: 'Date' },
]

export default function MultiSelect({ items = ITEMS }) {
  const [selected, setSelected] = useState(() => new Set())
  const allRef = useRef(null)

  const allChecked = items.length > 0 && selected.size === items.length
  const someChecked = selected.size > 0 && !allChecked

  // indeterminate is a DOM property — set it imperatively via the ref.
  useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = someChecked
  }, [someChecked])

  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const toggleAll = () =>
    setSelected(allChecked ? new Set() : new Set(items.map((i) => i.id)))

  return (
    <div>
      <label>
        <input ref={allRef} type="checkbox" data-testid="select-all" checked={allChecked} onChange={toggleAll} /> Select all
      </label>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((it) => (
          <li key={it.id}>
            <label>
              <input
                type="checkbox"
                data-testid={`item-${it.id}`}
                checked={selected.has(it.id)}
                onChange={() => toggle(it.id)}
              />{' '}
              {it.name}
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="selected-count">{selected.size} selected</p>
    </div>
  )
}
