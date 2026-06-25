import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import InfiniteList from './InfiniteList.jsx'

// jsdom has no IntersectionObserver — provide a controllable mock that captures
// the callback so the test can simulate the sentinel scrolling into view.
let triggerIntersect
beforeEach(() => {
  triggerIntersect = null
  global.IntersectionObserver = class {
    constructor(cb) {
      triggerIntersect = () => cb([{ isIntersecting: true }])
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})
afterEach(() => {
  delete global.IntersectionObserver
})

const intersect = async () => {
  await act(async () => {
    triggerIntersect?.()
  })
}

describe('InfiniteList', () => {
  it('loads the first batch on mount', async () => {
    const loadMore = vi.fn().mockResolvedValueOnce(['A', 'B'])
    render(<InfiniteList loadMore={loadMore} />)
    expect(await screen.findByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(loadMore).toHaveBeenCalledTimes(1)
  })

  it('appends more when the sentinel intersects, then shows the end', async () => {
    const loadMore = vi
      .fn()
      .mockResolvedValueOnce(['A', 'B'])
      .mockResolvedValueOnce(['C'])
      .mockResolvedValueOnce([])
    render(<InfiniteList loadMore={loadMore} />)
    await screen.findByText('A')

    await intersect()
    expect(await screen.findByText('C')).toBeInTheDocument()

    await intersect()
    expect(await screen.findByTestId('end')).toBeInTheDocument()
    // A 4th intersect must NOT call loadMore again (we're done)
    await intersect()
    expect(loadMore).toHaveBeenCalledTimes(3)
  })
})
