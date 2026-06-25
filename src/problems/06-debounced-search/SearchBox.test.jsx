import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import SearchBox from './SearchBox.jsx'

// NOTE: we use fireEvent.change (synchronous) instead of userEvent here, because
// userEvent's inter-keystroke delay does not play well with fake timers.
const type = (value) => {
  fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value } })
}

describe('SearchBox (debounced)', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('calls onSearch once, 300ms after typing stops', () => {
    const onSearch = vi.fn()
    render(<SearchBox onSearch={onSearch} />)

    type('a')
    type('ab')
    type('abc')
    expect(onSearch).not.toHaveBeenCalled()

    act(() => vi.advanceTimersByTime(300))
    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith('abc')
  })

  it('does not fire if more typing happens before the delay', () => {
    const onSearch = vi.fn()
    render(<SearchBox onSearch={onSearch} />)

    type('ab')
    act(() => vi.advanceTimersByTime(200)) // not enough
    type('abc')
    act(() => vi.advanceTimersByTime(200)) // timer was reset; only 200 since last key
    expect(onSearch).not.toHaveBeenCalled()

    act(() => vi.advanceTimersByTime(100)) // now 300ms since last key
    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith('abc')
  })
})
