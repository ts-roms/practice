import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import App from './App.jsx'

const USERS = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' },
  { id: 2, name: 'Alan Turing', email: 'alan@example.com' },
  { id: 3, name: 'Grace Hopper', email: 'grace@example.com' },
]

const mockOk = (data) => {
  global.fetch = vi.fn(async () => ({ ok: true, json: async () => data }))
}

afterEach(() => {
  delete global.fetch
})

describe('Q2 Users Directory — sample tests', () => {
  it('shows loading, then the list of users', async () => {
    mockOk(USERS)
    render(<App />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(await screen.findByTestId('user-1')).toHaveTextContent('Ada Lovelace')
    expect(screen.getByTestId('user-1')).toHaveTextContent('ada@example.com')
    expect(screen.getByTestId('user-count')).toHaveTextContent('3')
  })

  it('shows an error when the response is not ok', async () => {
    global.fetch = vi.fn(async () => ({ ok: false, json: async () => ({}) }))
    render(<App />)
    expect(await screen.findByTestId('error')).toHaveTextContent('Failed to load users')
  })
})

describe('Q2 Users Directory — hidden tests', () => {
  it('shows an error when fetch rejects', async () => {
    global.fetch = vi.fn(async () => {
      throw new Error('network')
    })
    render(<App />)
    expect(await screen.findByTestId('error')).toBeInTheDocument()
  })

  it('filters by name, case-insensitively, and updates the count', async () => {
    mockOk(USERS)
    const user = userEvent.setup()
    render(<App />)
    await screen.findByTestId('user-1')

    await user.type(screen.getByPlaceholderText('Search users'), 'ala')
    expect(screen.getByTestId('user-2')).toBeInTheDocument() // Alan Turing
    expect(screen.queryByTestId('user-1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('user-3')).not.toBeInTheDocument()
    expect(screen.getByTestId('user-count')).toHaveTextContent('1')
  })

  it('shows no-results when nothing matches', async () => {
    mockOk(USERS)
    const user = userEvent.setup()
    render(<App />)
    await screen.findByTestId('user-1')
    await user.type(screen.getByPlaceholderText('Search users'), 'zzz')
    expect(screen.getByTestId('no-results')).toHaveTextContent('No users found')
    expect(screen.queryByTestId('user-1')).not.toBeInTheDocument()
    expect(screen.getByTestId('user-count')).toHaveTextContent('0')
  })
})
