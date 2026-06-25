import { useState, useRef } from 'react'

export default function ReorderList({ initialItems = [] }) {
  const [items, setItems] = useState(initialItems)
  const dragIndex = useRef(null)

  const onDragStart = (i) => {
    dragIndex.current = i
  }
  const onDragOver = (e) => {
    e.preventDefault() // required to allow a drop
  }
  const onDrop = (to) => {
    const from = dragIndex.current
    dragIndex.current = null
    if (from === null || from === to) return
    setItems((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  return (
    <ul>
      {items.map((it, i) => (
        <li
          key={it}
          draggable
          data-testid={`item-${it}`}
          onDragStart={() => onDragStart(i)}
          onDragOver={onDragOver}
          onDrop={() => onDrop(i)}
        >
          {it}
        </li>
      ))}
    </ul>
  )
}
