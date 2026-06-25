import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Modal from './Modal.jsx'

describe('Modal', () => {
  it('is closed initially and opens on click', async () => {
    const user = userEvent.setup()
    render(<Modal>Hello modal</Modal>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /open/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Hello modal')).toBeInTheDocument()
  })

  it('closes via the Close button', async () => {
    const user = userEvent.setup()
    render(<Modal>Hello modal</Modal>)
    await user.click(screen.getByRole('button', { name: /open/i }))
    await user.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(<Modal>Hello modal</Modal>)
    await user.click(screen.getByRole('button', { name: /open/i }))
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes on backdrop click but NOT on content click', async () => {
    const user = userEvent.setup()
    render(<Modal>Hello modal</Modal>)
    await user.click(screen.getByRole('button', { name: /open/i }))

    // clicking the content should keep it open
    await user.click(screen.getByText('Hello modal'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // clicking the backdrop closes it
    await user.click(screen.getByTestId('backdrop'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
