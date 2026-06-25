import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import TodoList from './TodoList.jsx'

const add = async (user, label) => {
  await user.type(screen.getByPlaceholderText(/add todo/i), label)
  await user.click(screen.getByRole('button', { name: /^add$/i }))
}

describe('TodoList', () => {
  it('adds a todo and clears the input', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    await add(user, 'Buy milk')
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/add todo/i)).toHaveValue('')
  })

  it('ignores empty / whitespace input', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    await user.type(screen.getByPlaceholderText(/add todo/i), '   ')
    await user.click(screen.getByRole('button', { name: /^add$/i }))
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('toggles and deletes', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    await add(user, 'Task A')
    const item = screen.getByRole('listitem')
    await user.click(within(item).getByRole('checkbox'))
    expect(within(item).getByRole('checkbox')).toBeChecked()
    await user.click(within(item).getByRole('button', { name: /delete/i }))
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('filters active / completed and shows remaining count', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    await add(user, 'A')
    await add(user, 'B')
    // complete the first
    const first = screen.getAllByRole('listitem')[0]
    await user.click(within(first).getByRole('checkbox'))

    expect(screen.getByTestId('remaining')).toHaveTextContent('1 left')

    await user.click(screen.getByRole('button', { name: /active/i }))
    expect(screen.getAllByRole('listitem')).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: /completed/i }))
    expect(screen.getAllByRole('listitem')).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: /all/i }))
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
