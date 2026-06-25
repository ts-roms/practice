import { useEffect, useState } from 'react'

/**
 * PROBLEM 05 — Fetch + loading / error / empty states
 *
 * This is the pattern most asked for EV / charging dashboards.
 *
 * Requirements (see UserList.test.jsx):
 *  - On mount, fetch('https://api.example.com/users') and read res.json().
 *  - While the request is pending, show data-testid="loading" ("Loading...").
 *  - On success with a non-empty array, render each user's `name` in an <li>.
 *  - On success with an empty array, show data-testid="empty" ("No users").
 *  - On a rejected promise OR res.ok === false, show data-testid="error".
 *  - Only one of loading / error / empty / list is shown at a time.
 */
export default function UserList() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'

  // TODO: useEffect -> fetch, set status + users. Handle !res.ok and catch.

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch('https://api.example.com/users')
        if (!res.ok) {
          throw new Error('Request Failed')
        }
        const data = await res.json();

        setUsers(data);
        setStatus('success')
      } catch (error) {
        setStatus('error')
      }
    }

    getUsers();
  }, [])

  if (status === 'loading') {
    return <div data-testid="loading">Loading...</div>
  }

  if (status === 'error') {
    return <div data-testid="error">Error</div>
  }

  if (users.length === 0) {
    return <div data-testid="empty">No users</div>
  }

  return (
    <div>
      {/* TODO: render loading / error / empty / <ul> based on status */}
      {
        users.map((user) => (
          <li key={user.id ?? user.name}>{user.name}</li>
        ))
      }
    </div>
  )
}
