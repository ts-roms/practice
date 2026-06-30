import { useState, useRef, useEffect } from 'react'

const OPTIONS = ['React', 'Vue', 'Svelte', 'Angular', 'Solid']

export default function Dropdown({ options = OPTIONS, onChange }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDocMouseDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocMouseDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (opt) => {
    setSelected(opt)
    setOpen(false)
    onChange?.(opt)
  }

  return (
    <div ref={ref} style={{ position: 'relative', width: 200 }}>
      <button data-testid="trigger" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {selected ?? 'Select a framework'} ▾
      </button>
      {open && (
        <ul
          role="listbox"
          style={{ position: 'absolute', left: 0, right: 0, margin: 0, padding: 0, listStyle: 'none', border: '1px solid #ccc', background: '#fff', zIndex: 1 }}
        >
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              data-testid={`option-${opt}`}
              aria-selected={opt === selected}
              onClick={() => choose(opt)}
              style={{ padding: '6px 10px', cursor: 'pointer', background: opt === selected ? '#eef' : '#fff' }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
