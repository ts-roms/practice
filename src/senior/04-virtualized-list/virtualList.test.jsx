import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import VirtualList from './Starter.jsx'

const ITEMS = Array.from({ length: 1000 }, (_, i) => `Item ${i}`)

describe('VirtualList', () => {
  it('only renders the visible window, not all rows', () => {
    render(<VirtualList items={ITEMS} rowHeight={30} height={300} />)
    expect(screen.getByTestId('row-0')).toBeInTheDocument()
    expect(screen.queryByTestId('row-500')).not.toBeInTheDocument()
    // ~10 visible + small overscan, definitely far fewer than 1000
    expect(screen.getAllByText(/^Item /).length).toBeLessThan(20)
  })

  it('updates the window on scroll', () => {
    render(<VirtualList items={ITEMS} rowHeight={30} height={300} />)
    const viewport = screen.getByTestId('viewport')
    fireEvent.scroll(viewport, { target: { scrollTop: 3000 } }) // 3000/30 = index 100
    expect(screen.getByTestId('row-100')).toBeInTheDocument()
    expect(screen.queryByTestId('row-0')).not.toBeInTheDocument()
  })
})
