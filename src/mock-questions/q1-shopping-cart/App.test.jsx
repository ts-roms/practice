import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App.jsx'

const addProduct = async (user, id) => {
  const row = screen.getByTestId(`product-${id}`)
  await user.click(within(row).getByRole('button', { name: /add/i }))
}

describe('Q1 Shopping Cart — sample tests', () => {
  it('renders products with names and prices', () => {
    render(<App />)
    expect(screen.getByTestId('product-1')).toHaveTextContent('Charging Cable')
    expect(screen.getByTestId('product-1')).toHaveTextContent('$10')
    expect(screen.getByTestId('product-2')).toHaveTextContent('$25')
  })

  it('starts with an empty cart', () => {
    render(<App />)
    expect(screen.getByTestId('empty-cart')).toHaveTextContent('Your cart is empty')
  })

  it('adds a product to the cart', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addProduct(user, 1)
    expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Charging Cable')
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$10')
  })
})

describe('Q1 Shopping Cart — hidden tests', () => {
  it('increments quantity when the same product is added again', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addProduct(user, 2)
    await addProduct(user, 2)
    expect(screen.getByTestId('qty-2')).toHaveTextContent('2')
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$50')
  })

  it('+ and − adjust quantity; − at 1 removes the line', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addProduct(user, 3) // qty 1
    await user.click(within(screen.getByTestId('cart-item-3')).getByRole('button', { name: '+' }))
    expect(screen.getByTestId('qty-3')).toHaveTextContent('2')
    await user.click(within(screen.getByTestId('cart-item-3')).getByRole('button', { name: '−' }))
    expect(screen.getByTestId('qty-3')).toHaveTextContent('1')
    await user.click(within(screen.getByTestId('cart-item-3')).getByRole('button', { name: '−' }))
    expect(screen.queryByTestId('cart-item-3')).not.toBeInTheDocument()
    expect(screen.getByTestId('empty-cart')).toBeInTheDocument()
  })

  it('Remove deletes the line and totals update with mixed items', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addProduct(user, 1) // $10
    await addProduct(user, 2) // $25
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$35')
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
    await user.click(within(screen.getByTestId('cart-item-1')).getByRole('button', { name: /remove/i }))
    expect(screen.queryByTestId('cart-item-1')).not.toBeInTheDocument()
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$25')
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
  })

  it('shows the correct subtotal per line', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addProduct(user, 2) // $25
    await addProduct(user, 2) // qty 2 -> subtotal $50
    expect(screen.getByTestId('cart-item-2')).toHaveTextContent('$50')
  })
})
