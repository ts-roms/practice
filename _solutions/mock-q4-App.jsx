import { useState, useEffect } from 'react'

const API = 'https://api.example.com/tasks'
const JSON_HEADERS = { 'Content-Type': 'application/json' }

export default function App() {
  const [tasks, setTasks] = useState([])
  const [status, setStatus] = useState('loading')
  const [title, setTitle] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(API)
        const data = await res.json()
        if (!cancelled) setTasks(data)
      } finally {
        if (!cancelled) setStatus('ready')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const addTask = async () => {
    const t = title.trim()
    if (!t) return
    const res = await fetch(API, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({ title: t, completed: false }),
    })
    const created = await res.json()
    setTasks((prev) => [...prev, created])
    setTitle('')
  }

  const toggleTask = async (task) => {
    const res = await fetch(`${API}/${task.id}`, {
      method: 'PATCH',
      headers: JSON_HEADERS,
      body: JSON.stringify({ completed: !task.completed }),
    })
    const updated = await res.json()
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)))
  }

  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  if (status === 'loading') return <p data-testid="loading">Loading...</p>

  return (
    <div>
      <input placeholder="New task" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} data-testid={`task-${task.id}`}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task)} />
            <span data-completed={task.completed}>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <p data-testid="task-count">{tasks.length}</p>
    </div>
  )
}
