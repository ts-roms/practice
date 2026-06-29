import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import App from './App.jsx'

// In-memory fake REST API so the component does real CRUD against a mock fetch.
function installApi(initial) {
  let store = initial.map((t) => ({ ...t }))
  let nextId = (store.reduce((m, t) => Math.max(m, t.id), 0) || 0) + 1
  // Clone on the way out, like a real API returning fresh JSON (no shared refs).
  const ok = (data) => ({ ok: true, json: async () => JSON.parse(JSON.stringify(data)) })

  const fetchMock = vi.fn(async (url, options = {}) => {
    const method = (options.method || 'GET').toUpperCase()
    const idMatch = url.match(/\/tasks\/(\d+)$/)
    const id = idMatch ? Number(idMatch[1]) : null

    if (method === 'GET') return ok(store)
    if (method === 'POST') {
      const body = JSON.parse(options.body)
      const task = { id: nextId++, title: body.title, completed: false }
      store.push(task)
      return ok(task)
    }
    if (method === 'PATCH') {
      const body = JSON.parse(options.body)
      store = store.map((t) => (t.id === id ? { ...t, ...body } : t))
      return ok(store.find((t) => t.id === id))
    }
    if (method === 'DELETE') {
      store = store.filter((t) => t.id !== id)
      return ok({})
    }
    return ok({})
  })
  global.fetch = fetchMock
  return fetchMock
}

afterEach(() => {
  delete global.fetch
})

const SEED = [
  { id: 1, title: 'Buy cable', completed: false },
  { id: 2, title: 'Test charger', completed: true },
]

describe('Q4 CRUD — sample tests', () => {
  it('shows loading, then the tasks and a count', async () => {
    installApi(SEED)
    render(<App />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(await screen.findByTestId('task-1')).toHaveTextContent('Buy cable')
    expect(screen.getByTestId('task-2')).toHaveTextContent('Test charger')
    expect(screen.getByTestId('task-count')).toHaveTextContent('2')
  })

  it('creates a task via POST and appends it', async () => {
    const api = installApi(SEED)
    const user = userEvent.setup()
    render(<App />)
    await screen.findByTestId('task-1')

    await user.type(screen.getByPlaceholderText('New task'), 'Ship order')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(await screen.findByText('Ship order')).toBeInTheDocument()
    expect(screen.getByTestId('task-count')).toHaveTextContent('3')

    const postCall = api.mock.calls.find(([, opts]) => (opts?.method || '').toUpperCase() === 'POST')
    expect(postCall[0]).toBe('https://api.example.com/tasks')
    expect(JSON.parse(postCall[1].body)).toMatchObject({ title: 'Ship order' })
  })
})

describe('Q4 CRUD — hidden tests', () => {
  it('ignores an empty/whitespace title', async () => {
    const api = installApi(SEED)
    const user = userEvent.setup()
    render(<App />)
    await screen.findByTestId('task-1')
    await user.type(screen.getByPlaceholderText('New task'), '   ')
    await user.click(screen.getByRole('button', { name: /add/i }))
    expect(screen.getByTestId('task-count')).toHaveTextContent('2')
    expect(api.mock.calls.some(([, o]) => (o?.method || '').toUpperCase() === 'POST')).toBe(false)
  })

  it('toggles completed via PATCH', async () => {
    const api = installApi(SEED)
    const user = userEvent.setup()
    render(<App />)
    const row = await screen.findByTestId('task-1')

    await user.click(within(row).getByRole('checkbox'))
    expect(await within(row).findByRole('checkbox')).toBeChecked()

    const patchCall = api.mock.calls.find(([u, o]) => (o?.method || '').toUpperCase() === 'PATCH')
    expect(patchCall[0]).toBe('https://api.example.com/tasks/1')
    expect(JSON.parse(patchCall[1].body)).toMatchObject({ completed: true })
  })

  it('marks a completed task title with data-completed="true"', async () => {
    installApi(SEED)
    render(<App />)
    const row = await screen.findByTestId('task-2') // seeded completed: true
    expect(within(row).getByText('Test charger')).toHaveAttribute('data-completed', 'true')
  })

  it('deletes a task via DELETE', async () => {
    const api = installApi(SEED)
    const user = userEvent.setup()
    render(<App />)
    const row = await screen.findByTestId('task-1')
    await user.click(within(row).getByRole('button', { name: /delete/i }))

    await waitForRemoved(() => screen.queryByTestId('task-1'))
    expect(screen.getByTestId('task-count')).toHaveTextContent('1')

    const delCall = api.mock.calls.find(([u, o]) => (o?.method || '').toUpperCase() === 'DELETE')
    expect(delCall[0]).toBe('https://api.example.com/tasks/1')
  })
})

// small helper: poll until the element is gone
async function waitForRemoved(getter) {
  const { waitFor } = await import('@testing-library/react')
  await waitFor(() => expect(getter()).not.toBeInTheDocument())
}
