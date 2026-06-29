import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce, throttle } from './starter.js'

describe('debounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('runs once, delay ms after the last call', () => {
    const fn = vi.fn()
    const d = debounce(fn, 300)
    d('a')
    d('b')
    d('c')
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('c') // last args win
  })
})

describe('throttle', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('runs immediately, then at most once per limit', () => {
    const fn = vi.fn()
    const t = throttle(fn, 300)
    t('a') // leading edge -> runs now
    t('b') // within cooldown -> queued
    t('c')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')
    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(2) // trailing call
    expect(fn).toHaveBeenLastCalledWith('c')
  })
})
