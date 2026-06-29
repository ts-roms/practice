import { useState, useEffect } from 'react'

const API = 'https://api.example.com/tasks'

/**
 * Q4 — Tasks CRUD. See README.md for the API contract + data-testids.
 *
 * TODO:
 *  - load (GET) on mount, with a loading state.
 *  - add (POST) -> append the returned task, clear input, ignore empty titles.
 *  - toggle (PATCH /{id}) -> update completed.
 *  - remove (DELETE /{id}) -> drop from list.
 */
export default function App() {
  const [tasks, setTasks] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready'
  const [title, setTitle] = useState('')

  // TODO: useEffect to GET tasks on mount.

  // TODO: addTask, toggleTask, deleteTask.

  if (status === 'loading') return <p data-testid="loading">Loading...</p>

  return (
    <div>
      <input placeholder="New task" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button>Add</button>

      <ul>
        {/* TODO: render tasks (testid, title with data-completed, checkbox, Delete) */}
      </ul>

      <p data-testid="task-count">{tasks.length}</p>
    </div>
  )
}
