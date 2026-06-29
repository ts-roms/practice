import { describe, it, expect } from 'vitest'
import { curry, compose, pipe } from './starter.js'

const add3 = (a, b, c) => a + b + c
const inc = (x) => x + 1
const dbl = (x) => x * 2

describe('curry', () => {
  it('supports full and partial application', () => {
    const c = curry(add3)
    expect(c(1)(2)(3)).toBe(6)
    expect(c(1, 2)(3)).toBe(6)
    expect(c(1)(2, 3)).toBe(6)
    expect(c(1, 2, 3)).toBe(6)
  })
})

describe('compose / pipe', () => {
  it('compose runs right-to-left', () => {
    expect(compose(inc, dbl)(5)).toBe(11) // dbl(5)=10 -> inc=11
  })
  it('pipe runs left-to-right', () => {
    expect(pipe(inc, dbl)(5)).toBe(12) // inc(5)=6 -> dbl=12
  })
})
