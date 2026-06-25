import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import UserList from './UserList.jsx'

const mockFetch = (impl) => {
  global.fetch = vi.fn(impl)
}

describe('UserList', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })
  afterEach(() => {
    delete global.fetch
  })

  it('shows loading first, then the list of names', async () => {
    mockFetch(async () => ({
      ok: true,
      json: async () => [{ id: 1, name: 'Ada' }, { id: 2, name: 'Linus' }],
    }))
    render(<UserList />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(await screen.findByText('Ada')).toBeInTheDocument()
    expect(screen.getByText('Linus')).toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  it('shows empty state for an empty array', async () => {
    mockFetch(async () => ({ ok: true, json: async () => [] }))
    render(<UserList />)
    expect(await screen.findByTestId('empty')).toBeInTheDocument()
  })

  it('shows error when the response is not ok', async () => {
    mockFetch(async () => ({ ok: false, json: async () => ({}) }))
    render(<UserList />)
    expect(await screen.findByTestId('error')).toBeInTheDocument()
  })

  it('shows error when fetch rejects', async () => {
    mockFetch(async () => {
      throw new Error('network down')
    })
    render(<UserList />)
    expect(await screen.findByTestId('error')).toBeInTheDocument()
  })
})
