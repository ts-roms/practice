import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Cart from './Cart.jsx'

const PRODUCTS = [
  { id: 1, name: 'Apple', price: 3 },
  { id: 2, name: 'Banana', price: 2 },
]

describe('Cart (useReducer)', () => {
  it('adds products and computes the total', async () => {
    const user = userEvent.setup()
    render(<Cart products={PRODUCTS} />)
    await user.click(screen.getByRole('button', { name: 'Add Apple' }))
    await user.click(screen.getByRole('button', { name: 'Add Banana' }))
    expect(screen.getByText('Apple x 1')).toBeInTheDocument()
    expect(screen.getByText('Banana x 1')).toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent('$5')
  })

  it('increments quantity when adding the same product again', async () => {
    const user = userEvent.setup()
    render(<Cart products={PRODUCTS} />)
    await user.click(screen.getByRole('button', { name: 'Add Apple' }))
    await user.click(screen.getByRole('button', { name: 'Add Apple' }))
    expect(screen.getByText('Apple x 2')).toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent('$6')
  })

  it('+ and - adjust quantity; - at 1 removes the line', async () => {
    const user = userEvent.setup()
    render(<Cart products={PRODUCTS} />)
    await user.click(screen.getByRole('button', { name: 'Add Apple' }))
    const line = screen.getByText('Apple x 1').closest('li')
    await user.click(within(line).getByRole('button', { name: '+' }))
    expect(screen.getByText('Apple x 2')).toBeInTheDocument()
    await user.click(within(line).getByRole('button', { name: '-' }))
    expect(screen.getByText('Apple x 1')).toBeInTheDocument()
    await user.click(within(line).getByRole('button', { name: '-' }))
    expect(screen.queryByText(/Apple x/)).not.toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent('$0')
  })

  it('clears the cart', async () => {
    const user = userEvent.setup()
    render(<Cart products={PRODUCTS} />)
    await user.click(screen.getByRole('button', { name: 'Add Apple' }))
    await user.click(screen.getByRole('button', { name: 'Add Banana' }))
    await user.click(screen.getByRole('button', { name: /clear/i }))
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent('$0')
  })
})
