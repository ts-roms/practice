import { describe, it, expect, vi } from 'vitest'
import EventEmitter from './EventEmitter.js'

describe('Q3 EventEmitter — sample tests', () => {
  it('calls a subscribed listener on emit', () => {
    const ee = new EventEmitter()
    const fn = vi.fn()
    ee.on('greet', fn)
    ee.emit('greet', 'hello')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('hello')
  })

  it('emit returns false when there are no listeners', () => {
    const ee = new EventEmitter()
    expect(ee.emit('nothing')).toBe(false)
  })

  it('emit returns true when listeners exist', () => {
    const ee = new EventEmitter()
    ee.on('x', () => {})
    expect(ee.emit('x')).toBe(true)
  })
})

describe('Q3 EventEmitter — hidden tests', () => {
  it('fires multiple listeners in subscription order with all args', () => {
    const ee = new EventEmitter()
    const calls = []
    ee.on('sum', (a, b) => calls.push(['first', a + b]))
    ee.on('sum', (a, b) => calls.push(['second', a * b]))
    ee.emit('sum', 2, 3)
    expect(calls).toEqual([
      ['first', 5],
      ['second', 6],
    ])
  })

  it('off removes a specific listener', () => {
    const ee = new EventEmitter()
    const a = vi.fn()
    const b = vi.fn()
    ee.on('e', a)
    ee.on('e', b)
    ee.off('e', a)
    ee.emit('e')
    expect(a).not.toHaveBeenCalled()
    expect(b).toHaveBeenCalledTimes(1)
  })

  it('on returns an unsubscribe function', () => {
    const ee = new EventEmitter()
    const fn = vi.fn()
    const unsubscribe = ee.on('e', fn)
    expect(typeof unsubscribe).toBe('function')
    unsubscribe()
    ee.emit('e')
    expect(fn).not.toHaveBeenCalled()
  })

  it('once fires at most once', () => {
    const ee = new EventEmitter()
    const fn = vi.fn()
    ee.once('e', fn)
    ee.emit('e', 1)
    ee.emit('e', 2)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(1)
  })

  it('keeps events independent', () => {
    const ee = new EventEmitter()
    const a = vi.fn()
    const b = vi.fn()
    ee.on('a', a)
    ee.on('b', b)
    ee.emit('a')
    expect(a).toHaveBeenCalledTimes(1)
    expect(b).not.toHaveBeenCalled()
  })

  it('removing an unknown listener is a no-op', () => {
    const ee = new EventEmitter()
    expect(() => ee.off('e', () => {})).not.toThrow()
  })
})
