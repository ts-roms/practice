import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import SortableTable from './SortableTable.jsx'

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
]
const ROWS = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 35 },
  { name: 'Bob', age: 25 },
]

const bodyOrder = (colIndex = 0) =>
  screen
    .getAllByRole('row')
    .slice(1) // drop the header row
    .map((r) => within(r).getAllByRole('cell')[colIndex].textContent)

describe('SortableTable', () => {
  it('renders in original order with aria-sort=none', () => {
    render(<SortableTable columns={COLUMNS} rows={ROWS} />)
    expect(bodyOrder()).toEqual(['Charlie', 'Alice', 'Bob'])
    screen.getAllByRole('columnheader').forEach((th) => {
      expect(th).toHaveAttribute('aria-sort', 'none')
    })
  })

  it('sorts ascending by name, then descending on second click', async () => {
    const user = userEvent.setup()
    render(<SortableTable columns={COLUMNS} rows={ROWS} />)
    await user.click(screen.getByRole('button', { name: 'Name' }))
    expect(bodyOrder()).toEqual(['Alice', 'Bob', 'Charlie'])
    expect(screen.getByRole('columnheader', { name: /name/i })).toHaveAttribute('aria-sort', 'ascending')

    await user.click(screen.getByRole('button', { name: 'Name' }))
    expect(bodyOrder()).toEqual(['Charlie', 'Bob', 'Alice'])
    expect(screen.getByRole('columnheader', { name: /name/i })).toHaveAttribute('aria-sort', 'descending')
  })

  it('sorts numbers numerically', async () => {
    const user = userEvent.setup()
    render(<SortableTable columns={COLUMNS} rows={ROWS} />)
    await user.click(screen.getByRole('button', { name: 'Age' }))
    expect(bodyOrder(1)).toEqual(['25', '30', '35'])
  })

  it('resets the other column header to none when switching sort', async () => {
    const user = userEvent.setup()
    render(<SortableTable columns={COLUMNS} rows={ROWS} />)
    await user.click(screen.getByRole('button', { name: 'Name' }))
    await user.click(screen.getByRole('button', { name: 'Age' }))
    expect(screen.getByRole('columnheader', { name: /name/i })).toHaveAttribute('aria-sort', 'none')
    expect(screen.getByRole('columnheader', { name: /age/i })).toHaveAttribute('aria-sort', 'ascending')
  })
})
