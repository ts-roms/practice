import { useState, useEffect } from 'react'

export default function Modal({ children = 'Dialog content' }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && (
        <div
          data-testid="backdrop"
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)' }}
        >
          <div role="dialog" onClick={(e) => e.stopPropagation()} style={{ background: '#fff', padding: 16 }}>
            {children}
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
