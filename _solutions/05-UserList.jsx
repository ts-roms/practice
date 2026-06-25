import { useEffect, useState } from 'react'

export default function UserList() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

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
  if (status === 'error') return <p data-testid="error">Something went wrong</p>
  if (users.length === 0) return <p data-testid="empty">No users</p>

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}
