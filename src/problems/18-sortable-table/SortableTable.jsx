import { useState } from 'react'

/**
 * PROBLEM 18 — Sortable table
 *
 * Props:
 *   columns = [{ key, label }]
 *   rows    = [{ ...matching keys }]
 *
 * Requirements (see SortableTable.test.jsx):
 *  - Render a <table>. Each column header is a <th> containing a <button> with
 *    the column label (clickable to sort).
 *  - Initially rows render in their original order; every <th> has
 *    aria-sort="none".
 *  - Clicking a header sorts ascending by that column; clicking the SAME header
 *    again toggles to descending. The active <th> has aria-sort="ascending" or
 *    "descending"; others reset to "none".
 *  - Sort numbers numerically and strings alphabetically.
 *  - Render each row's cells (<td>) in column order.
 */
export default function SortableTable({ columns = [], rows = [] }) {
  const [sortKey, setSortKey] = useState(null)
  const [dir, setDir] = useState('asc') // 'asc' | 'desc'

  // TODO: onSort(key) toggles direction; compute sorted rows; set aria-sort.

  return (
    <table>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} aria-sort="none">
              <button>{c.label}</button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* TODO: render sorted rows */}
      </tbody>
    </table>
  )
}
