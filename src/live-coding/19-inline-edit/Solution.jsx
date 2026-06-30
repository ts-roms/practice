import { useState } from 'react'

const INITIAL = [
  { id: 1, text: 'Buy milk' },
  { id: 2, text: 'Walk the dog' },
  { id: 3, text: 'Write code' },
]

export default function EditableList({ initial = INITIAL }) {
  const [items, setItems] = useState(initial)
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState('')

  const startEdit = (item) => {
    setEditingId(item.id)
    setDraft(item.text)
  }

  const save = () => {
    const text = draft.trim()
    if (text) {
      setItems((prev) => prev.map((it) => (it.id === editingId ? { ...it, text } : it)))
    }
    setEditingId(null)
  }

  const cancel = () => setEditingId(null)

  const onKeyDown = (e) => {
    if (e.key === 'Enter') save()
    else if (e.key === 'Escape') cancel()
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} data-testid={`item-${item.id}`}>
          {editingId === item.id ? (
            <input
              autoFocus
              data-testid="edit-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              onBlur={save}
            />
          ) : (
            <span onDoubleClick={() => startEdit(item)} style={{ cursor: 'pointer' }}>
              {item.text}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
