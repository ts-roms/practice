import { useState, useRef, useEffect } from 'react'

// Live coding 14 — Toast Notifications. Build from CHALLENGE.md.
export default function Toaster() {
  const [toasts, setToasts] = useState([]) // { id, message }
  const nextId = useRef(1)

  // TODO: addToast (unique id), dismiss(id). Each toast auto-dismisses after 3s.

  return (
    <div>
      <button>Add toast</button>
      <div>{/* TODO: render the stack of toasts */}</div>
    </div>
  )
}
