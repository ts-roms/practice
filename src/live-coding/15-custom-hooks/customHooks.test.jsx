import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useToggle, usePrevious } from './starter.js'

describe('useToggle', () => {
  it('defaults to false and flips', () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current[0]).toBe(false)
    act(() => result.current[1]())
    expect(result.current[0]).toBe(true)
    act(() => result.current[1]())
    expect(result.current[0]).toBe(false)
  })

  it('can be forced to a specific value', () => {
    const { result } = renderHook(() => useToggle(true))
    act(() => result.current[1](false))
    expect(result.current[0]).toBe(false)
  })
})

describe('usePrevious', () => {
  it('returns undefined on first render, then the previous value', () => {
    const { result, rerender } = renderHook(({ v }) => usePrevious(v), {
      initialProps: { v: 1 },
    })
    expect(result.current).toBeUndefined()
    rerender({ v: 2 })
    expect(result.current).toBe(1)
    rerender({ v: 3 })
    expect(result.current).toBe(2)
  })
})
