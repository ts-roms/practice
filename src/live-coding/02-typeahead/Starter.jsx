import { useState } from 'react'

const FRUITS = ['Apple', 'Apricot', 'Avocado', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Mango']

// Live coding 2 — Typeahead. Build from CHALLENGE.md.
export default function Typeahead({ options = FRUITS }) {
  const [query, setQuery] = useState('')

  // TODO: derive suggestions; handle open state, keyboard nav, selection.

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search fruit" />
      {/* TODO: dropdown */}
    </div>
  )
}
