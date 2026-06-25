import { useState } from 'react'

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')
  let nextId = useState(() => ({ n: 1 }))[0]

  const addTodo = () => {
    const t = text.trim()
    if (!t) return
    setTodos((prev) => [...prev, { id: nextId.n++, text: t, completed: false }])
    setText('')
  }

  const toggleTodo = (id) =>
    setTodos((prev) => prev.map((td) => (td.id === id ? { ...td, completed: !td.completed } : td)))

  const deleteTodo = (id) => setTodos((prev) => prev.filter((td) => td.id !== id))

  const visible = todos.filter((td) =>
    filter === 'active' ? !td.completed : filter === 'completed' ? td.completed : true,
  )
  const remaining = todos.filter((td) => !td.completed).length

  return (
    <div>
      <input placeholder="Add todo" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <ul>
        {visible.map((td) => (
          <li key={td.id}>
            <input type="checkbox" checked={td.completed} onChange={() => toggleTodo(td.id)} />
            <span style={{ textDecoration: td.completed ? 'line-through' : 'none' }}>{td.text}</span>
            <button onClick={() => deleteTodo(td.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <p data-testid="remaining">{remaining} left</p>
    </div>
  )
}
