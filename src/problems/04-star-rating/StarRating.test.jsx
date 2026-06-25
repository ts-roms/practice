import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import StarRating from './StarRating.jsx'

const filledCount = () =>
  screen.getAllByRole('button').filter((b) => b.getAttribute('data-filled') === 'true').length

describe('StarRating', () => {
  it('renders the given number of stars, none filled initially', () => {
    render(<StarRating count={5} />)
    expect(screen.getAllByRole('button')).toHaveLength(5)
    expect(filledCount()).toBe(0)
  })

  it('fills up to the clicked star and calls onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<StarRating count={5} onChange={onChange} />)
    await user.click(screen.getByRole('button', { name: 'Star 3' }))
    expect(filledCount()).toBe(3)
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('previews on hover then restores committed rating on leave', async () => {
    const user = userEvent.setup()
    render(<StarRating count={5} />)
    await user.click(screen.getByRole('button', { name: 'Star 2' }))
    expect(filledCount()).toBe(2)

    await user.hover(screen.getByRole('button', { name: 'Star 4' }))
    expect(filledCount()).toBe(4)

    await user.unhover(screen.getByRole('button', { name: 'Star 4' }))
    expect(filledCount()).toBe(2)
  })
})
