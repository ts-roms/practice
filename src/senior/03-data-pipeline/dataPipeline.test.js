import { describe, it, expect } from 'vitest'
import { getView } from './starter.js'

const ROWS = [
  { id: 1, name: 'Charlie', age: 30 },
  { id: 2, name: 'Alice', age: 35 },
  { id: 3, name: 'Bob', age: 25 },
  { id: 4, name: 'Dave', age: 28 },
  { id: 5, name: 'Eve', age: 41 },
]

describe('getView', () => {
  it('paginates with correct totals', () => {
    const view = getView(ROWS, { page: 1, pageSize: 2 })
    expect(view.rows.map((r) => r.id)).toEqual([1, 2])
    expect(view.total).toBe(5)
    expect(view.totalPages).toBe(3)
  })

  it('sorts ascending and descending without mutating input', () => {
    const before = [...ROWS]
    const asc = getView(ROWS, { sortKey: 'age', sortDir: 'asc', pageSize: 10 })
    expect(asc.rows.map((r) => r.age)).toEqual([25, 28, 30, 35, 41])
    const desc = getView(ROWS, { sortKey: 'name', sortDir: 'desc', pageSize: 10 })
    expect(desc.rows.map((r) => r.name)).toEqual(['Eve', 'Dave', 'Charlie', 'Bob', 'Alice'])
    expect(ROWS).toEqual(before) // input untouched
  })

  it('filters before paginating, and totals reflect the filtered set', () => {
    const view = getView(ROWS, { query: 'e', pageSize: 2 }) // Charlie, Alice, Dave, Eve
    expect(view.total).toBe(4)
    expect(view.totalPages).toBe(2)
    expect(view.rows).toHaveLength(2)
  })

  it('clamps an out-of-range page', () => {
    const view = getView(ROWS, { page: 99, pageSize: 2 })
    expect(view.page).toBe(3)
    expect(view.rows.map((r) => r.id)).toEqual([5])
  })
})
