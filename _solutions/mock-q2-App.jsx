import { useState, useEffect } from 'react'
import SearchBar from './SearchBar.jsx'
import UserCard from './UserCard.jsx'

export default function App() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('https://api.example.com/users')
        if (!res.ok) throw new Error('Request failed')
        const data = await res.json()
        if (cancelled) return
        setUsers(data)
        setStatus('success')
      } catch {
        if (!cancelled) setStatus('error')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (status === 'loading') return <p data-testid="loading">Loading...</p>
  if (status === 'error') return <p data-testid="error">Failed to load users</p>

  const visible = users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} />
      <p data-testid="user-count">{visible.length}</p>
      {visible.length === 0 ? (
        <p data-testid="no-results">No users found</p>
      ) : (
        visible.map((u) => <UserCard key={u.id} user={u} />)
      )}
    </div>
  )
}
