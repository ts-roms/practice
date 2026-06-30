import { useState, useRef, useEffect } from 'react'

const OPTIONS = ['React', 'Vue', 'Svelte', 'Angular', 'Solid']

// Live coding 16 — Custom Dropdown. Build from CHALLENGE.md.
// Key idea: useRef on the container + a document mousedown listener (while open)
// with cleanup, to close on outside click.
export default function Dropdown({ options = OPTIONS, onChange }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)

  // TODO: close on outside click + Escape; choose() selects and closes.

  return (
    <div ref={ref} style={{ position: 'relative', width: 200 }}>
      <button data-testid="trigger" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {selected ?? 'Select a framework'} ▾
      </button>
      {/* TODO: render the options listbox when open */}
    </div>
  )
}
