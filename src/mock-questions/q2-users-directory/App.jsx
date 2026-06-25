import { useState, useEffect } from 'react'
import SearchBar from './SearchBar.jsx'
import UserCard from './UserCard.jsx'

/**
 * Fetches users, manages status + query, renders search + filtered list.
 *
 * TODO:
 *  - useEffect: fetch on mount, handle ok/!ok/catch, set status + users.
 *  - loading -> data-testid="loading"; error -> data-testid="error".
 *  - success -> SearchBar + user-count + filtered UserCards (or no-results).
 */
export default function App() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [query, setQuery] = useState('')

  // TODO: fetch users in an effect.

  // TODO: derive the filtered list and render the right branch.
  return (
    <div>
      {/* TODO */}
    </div>
  )
}
