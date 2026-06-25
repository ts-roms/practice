import { useState } from 'react'
import { useDebounce } from './useDebounce.js'

// Preview demo. The graded unit is the useDebounce hook (see its test file).
export default function UseDebounceDemo() {
  const [text, setText] = useState('')
  const debounced = useDebounce(text, 500)
  return (
    <div>
      <p>Type fast — the debounced value updates 500ms after you stop.</p>
      <input placeholder="Search..." value={text} onChange={(e) => setText(e.target.value)} />
      <p>Live: <strong>{text || '(empty)'}</strong></p>
      <p>Debounced: <strong>{debounced || '(empty)'}</strong></p>
    </div>
  )
}
