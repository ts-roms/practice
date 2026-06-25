import { useState } from 'react'

export default function SortableTable({ columns = [], rows = [] }) {
  const [sortKey, setSortKey] = useState(null)
  const [dir, setDir] = useState('asc')

  const onSort = (key) => {
    if (key === sortKey) {
      setDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setDir('asc')
    }
  }

  const sorted = sortKey
    ? [...rows].sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        let cmp
        if (typeof av === 'number' && typeof bv === 'number') {
          cmp = av - bv
        } else {
          cmp = String(av).localeCompare(String(bv))
        }
        return dir === 'asc' ? cmp : -cmp
      })
    : rows

  const ariaSort = (key) => (key === sortKey ? (dir === 'asc' ? 'ascending' : 'descending') : 'none')

  return (
    <table>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} aria-sort={ariaSort(c.key)}>
              <button onClick={() => onSort(c.key)}>{c.label}</button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((row, i) => (
          <tr key={i}>
            {columns.map((c) => (
              <td key={c.key}>{row[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
