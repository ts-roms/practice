import { useState, useRef, useEffect } from 'react'

// Each toast owns its own auto-dismiss timer (tied to its lifecycle = no leaks).
function Toast({ toast, onDismiss }) {
  useEffect(() => {
    const id = setTimeout(() => onDismiss(toast.id), 3000)
    return () => clearTimeout(id)
  }, [toast.id, onDismiss])

  return (
    <div
      data-testid={`toast-${toast.id}`}
      style={{ background: '#333', color: '#fff', padding: '8px 12px', borderRadius: 6, marginTop: 6, display: 'flex', gap: 12, alignItems: 'center' }}
    >
      <span>{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} aria-label="dismiss">×</button>
    </div>
  )
}

export default function Toaster() {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(1)

  const addToast = () => {
    const id = nextId.current++
    setToasts((prev) => [...prev, { id, message: `Toast ${id}` }])
  }

  const dismiss = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <div>
      <button onClick={addToast}>Add toast</button>
      <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </div>
  )
}
