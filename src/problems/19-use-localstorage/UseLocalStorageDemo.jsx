import { useLocalStorage } from './useLocalStorage.js'

// Preview demo. The graded unit is the useLocalStorage hook (see its test file).
export default function UseLocalStorageDemo() {
  const [name, setName] = useLocalStorage('demo-name', '')
  return (
    <div>
      <p>Type below, then refresh the page — it persists via localStorage.</p>
      <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
      <p>Stored value: <strong>{name || '(empty)'}</strong></p>
    </div>
  )
}
