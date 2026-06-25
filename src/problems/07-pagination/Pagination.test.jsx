import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Pagination from './Pagination.jsx'

const ITEMS = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`)

describe('Pagination', () => {
  it('shows the first page and correct page info', () => {
    render(<Pagination items={ITEMS} pageSize={5} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByTestId('page-info')).toHaveTextContent('Page 1 of 3')
  })

  it('disables Prev on first page', () => {
    render(<Pagination items={ITEMS} pageSize={5} />)
    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled()
  })

  it('navigates to the next page', async () => {
    const user = userEvent.setup()
    render(<Pagination items={ITEMS} pageSize={5} />)
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText('Item 6')).toBeInTheDocument()
    expect(screen.getByTestId('page-info')).toHaveTextContent('Page 2 of 3')
  })

  it('disables Next on the last page and shows the remainder', async () => {
    const user = userEvent.setup()
    render(<Pagination items={ITEMS} pageSize={5} />)
    await user.click(screen.getByRole('button', { name: /next/i }))
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByTestId('page-info')).toHaveTextContent('Page 3 of 3')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
  })
})
