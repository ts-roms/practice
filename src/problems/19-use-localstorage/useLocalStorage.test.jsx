import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useLocalStorage } from './useLocalStorage.js'

beforeEach(() => {
  localStorage.clear()
})

describe('useLocalStorage', () => {
  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))
    expect(result.current[0]).toBe(0)
  })

  it('reads an existing value from localStorage on init', () => {
    localStorage.setItem('name', JSON.stringify('Ada'))
    const { result } = renderHook(() => useLocalStorage('name', 'default'))
    expect(result.current[0]).toBe('Ada')
  })

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))
    act(() => result.current[1](5))
    expect(result.current[0]).toBe(5)
    expect(JSON.parse(localStorage.getItem('count'))).toBe(5)
  })

  it('supports a functional updater', () => {
    const { result } = renderHook(() => useLocalStorage('count', 10))
    act(() => result.current[1]((prev) => prev + 1))
    expect(result.current[0]).toBe(11)
    expect(JSON.parse(localStorage.getItem('count'))).toBe(11)
  })
})
