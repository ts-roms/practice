import { renderHook, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { useFetch } from './useFetch.js'

afterEach(() => {
  delete global.fetch
})

describe('useFetch', () => {
  it('starts loading, then returns data', async () => {
    global.fetch = vi.fn(async () => ({ ok: true, json: async () => ({ id: 1, name: 'Ada' }) }))
    const { result } = renderHook(() => useFetch('/api/x'))

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBe(null)

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data).toEqual({ id: 1, name: 'Ada' })
    expect(result.current.error).toBe(null)
  })

  it('sets error on a non-ok response', async () => {
    global.fetch = vi.fn(async () => ({ ok: false, json: async () => ({}) }))
    const { result } = renderHook(() => useFetch('/api/x'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBeTruthy()
    expect(result.current.data).toBe(null)
  })

  it('sets error when fetch rejects', async () => {
    global.fetch = vi.fn(async () => {
      throw new Error('network')
    })
    const { result } = renderHook(() => useFetch('/api/x'))
    await waitFor(() => expect(result.current.error).toBeTruthy())
  })

  it('refetch re-runs the request', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ v: 1 }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ v: 2 }) })
    global.fetch = fetchMock

    const { result } = renderHook(() => useFetch('/api/x'))
    await waitFor(() => expect(result.current.data).toEqual({ v: 1 }))

    act(() => {
      result.current.refetch()
    })
    await waitFor(() => expect(result.current.data).toEqual({ v: 2 }))
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
