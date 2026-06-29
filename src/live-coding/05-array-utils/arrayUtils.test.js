import { describe, it, expect } from 'vitest'
import { flatten, groupBy } from './starter.js'

describe('flatten', () => {
  it('flattens arbitrarily nested arrays', () => {
    expect(flatten([1, [2, [3, [4]], 5]])).toEqual([1, 2, 3, 4, 5])
  })
  it('handles an empty array', () => {
    expect(flatten([])).toEqual([])
  })
  it('handles an already-flat array', () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3])
  })
})

describe('groupBy', () => {
  it('groups by a numeric key function', () => {
    expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ 6: [6.1, 6.3], 4: [4.2] })
  })
  it('groups by string length', () => {
    expect(groupBy(['one', 'two', 'three'], (w) => w.length)).toEqual({
      3: ['one', 'two'],
      5: ['three'],
    })
  })
  it('returns {} for an empty array', () => {
    expect(groupBy([], (x) => x)).toEqual({})
  })
})
