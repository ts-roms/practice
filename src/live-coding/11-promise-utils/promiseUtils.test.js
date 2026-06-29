import { describe, it, expect, vi } from 'vitest'
import { promiseAll, retry } from './starter.js'

describe('promiseAll', () => {
  it('resolves results in input order', async () => {
    const slow = new Promise((res) => setTimeout(() => res('a'), 10))
    const fast = Promise.resolve('b')
    await expect(promiseAll([slow, fast])).resolves.toEqual(['a', 'b'])
  })

  it('resolves to [] for an empty array', async () => {
    await expect(promiseAll([])).resolves.toEqual([])
  })

  it('rejects if any promise rejects', async () => {
    await expect(promiseAll([Promise.resolve(1), Promise.reject(new Error('boom'))])).rejects.toThrow('boom')
  })
})

describe('retry', () => {
  it('resolves if a later attempt succeeds', async () => {
    let calls = 0
    const fn = vi.fn(() => {
      calls += 1
      return calls < 3 ? Promise.reject(new Error('fail')) : Promise.resolve('ok')
    })
    await expect(retry(fn, 3)).resolves.toBe('ok')
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('rejects with the last error if all attempts fail', async () => {
    const fn = vi.fn(() => Promise.reject(new Error('always')))
    await expect(retry(fn, 2)).rejects.toThrow('always')
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
