import { useState } from 'react'

const INITIAL = [
  { id: 1, text: 'Buy milk' },
  { id: 2, text: 'Walk the dog' },
  { id: 3, text: 'Write code' },
]

// Live coding 19 — Inline-editable list. Build from CHALLENGE.md.
export default function EditableList({ initial = INITIAL }) {
  const [items, setItems] = useState(initial)
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState('')

  // TODO: startEdit(item), save(), cancel(), key handling.

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} data-testid={`item-${item.id}`}>
          {/* TODO: edit input when editingId === item.id, else text with onDoubleClick */}
          {item.text}
        </li>
      ))}
    </ul>
  )
}
