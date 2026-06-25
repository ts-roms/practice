import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useDebounce } from './useDebounce.js'

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('a', 300))
    expect(result.current).toBe('a')
  })

  it('updates only after the delay', () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 300), {
      initialProps: { v: 'a' },
    })
    rerender({ v: 'ab' })
    expect(result.current).toBe('a') // not yet
    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('ab')
  })

  it('resets the timer when value changes again before the delay', () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 300), {
      initialProps: { v: 'a' },
    })
    rerender({ v: 'ab' })
    act(() => vi.advanceTimersByTime(200)) // not enough
    rerender({ v: 'abc' })
    act(() => vi.advanceTimersByTime(200)) // timer was reset
    expect(result.current).toBe('a')
    act(() => vi.advanceTimersByTime(100)) // now 300ms since last change
    expect(result.current).toBe('abc')
  })
})
