import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MemoList from './Starter.jsx'

const ITEMS = [
  { id: 1, name: 'One' },
  { id: 2, name: 'Two' },
  { id: 3, name: 'Three' },
]

describe('MemoList (render optimization)', () => {
  it('does NOT re-render rows on unrelated parent state changes', () => {
    const onRender = vi.fn()
    render(<MemoList items={ITEMS} onRender={onRender} />)
    expect(onRender).toHaveBeenCalledTimes(3) // initial render of 3 rows

    onRender.mockClear()
    fireEvent.click(screen.getByText(/tick/)) // unrelated state
    expect(onRender).not.toHaveBeenCalled() // rows untouched
  })

  it('re-renders only the row whose selected-state changed', () => {
    const onRender = vi.fn()
    render(<MemoList items={ITEMS} onRender={onRender} />)
    onRender.mockClear()

    fireEvent.click(screen.getByTestId('row-2'))
    expect(onRender).toHaveBeenCalledTimes(1)
    expect(onRender).toHaveBeenCalledWith(2)
  })
})
