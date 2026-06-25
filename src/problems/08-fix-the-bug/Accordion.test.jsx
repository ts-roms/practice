import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Accordion from './Accordion.jsx'

const SECTIONS = [
  { title: 'Section A', body: 'Body A' },
  { title: 'Section B', body: 'Body B' },
  { title: 'Section C', body: 'Body C' },
]

describe('Accordion (fix the bug)', () => {
  it('starts with all sections collapsed', () => {
    render(<Accordion sections={SECTIONS} />)
    expect(screen.queryByText('Body A')).not.toBeInTheDocument()
    expect(screen.queryByText('Body B')).not.toBeInTheDocument()
  })

  it('opens a section on click', async () => {
    const user = userEvent.setup()
    render(<Accordion sections={SECTIONS} />)
    await user.click(screen.getByRole('button', { name: 'Section A' }))
    expect(screen.getByText('Body A')).toBeInTheDocument()
  })

  it('allows MULTIPLE sections open at once', async () => {
    const user = userEvent.setup()
    render(<Accordion sections={SECTIONS} />)
    await user.click(screen.getByRole('button', { name: 'Section A' }))
    await user.click(screen.getByRole('button', { name: 'Section C' }))
    expect(screen.getByText('Body A')).toBeInTheDocument()
    expect(screen.getByText('Body C')).toBeInTheDocument()
  })

  it('toggles a section closed again', async () => {
    const user = userEvent.setup()
    render(<Accordion sections={SECTIONS} />)
    const btn = screen.getByRole('button', { name: 'Section B' })
    await user.click(btn)
    expect(screen.getByText('Body B')).toBeInTheDocument()
    await user.click(btn)
    expect(screen.queryByText('Body B')).not.toBeInTheDocument()
  })
})
