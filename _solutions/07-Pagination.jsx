import { useState } from 'react'

export default function Pagination({ items = [], pageSize = 5 }) {
  const [page, setPage] = useState(0)
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const current = Math.min(page, totalPages - 1)
  const slice = items.slice(current * pageSize, current * pageSize + pageSize)

  return (
    <div>
      <ul>
        {slice.map((it, i) => (
          <li key={current * pageSize + i}>{it}</li>
        ))}
      </ul>
      <button disabled={current === 0} onClick={() => setPage((p) => p - 1)}>
        Prev
      </button>
      <span data-testid="page-info">
        Page {current + 1} of {totalPages}
      </span>
      <button disabled={current >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
        Next
      </button>
    </div>
  )
}
