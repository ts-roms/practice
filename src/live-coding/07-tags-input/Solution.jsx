import { useState } from 'react'

export default function TagsInput() {
  const [tags, setTags] = useState([])
  const [text, setText] = useState('')

  const addTag = () => {
    const t = text.trim()
    if (!t || tags.includes(t)) {
      setText('')
      return
    }
    setTags((prev) => [...prev, t])
    setText('')
  }

  const removeTag = (t) => setTags((prev) => prev.filter((x) => x !== t))

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    } else if (e.key === 'Backspace' && text === '' && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1))
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
        {tags.map((t) => (
          <span
            key={t}
            data-testid={`tag-${t}`}
            style={{ background: '#eef', padding: '2px 8px', borderRadius: 12 }}
          >
            {t}{' '}
            <button onClick={() => removeTag(t)} aria-label={`remove ${t}`}>
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        placeholder="Add tag"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}
