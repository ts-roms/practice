import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * PROBLEM 16 — Infinite scroll with IntersectionObserver  [ADVANCED]
 *
 * Props:
 *   loadMore() => Promise<string[]>   // returns the next batch; [] means "no more"
 *
 * Requirements (see InfiniteList.test.jsx):
 *  - On mount, load the first batch and render each string in an <li>.
 *  - Render a sentinel element with data-testid="sentinel" at the bottom and
 *    observe it with an IntersectionObserver. When it intersects, load the next
 *    batch and APPEND it.
 *  - While a batch is loading show data-testid="loading".
 *  - When loadMore() resolves to an empty array, stop and show data-testid="end".
 *  - Never run two loads at once (guard against overlapping requests).
 *  - Disconnect the observer on unmount.
 */
export default function InfiniteList({ loadMore }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const sentinelRef = useRef(null)
  const loadingRef = useRef(false)

  // TODO: fetchNext (guarded, append, set done on empty);
  //       initial load on mount; IntersectionObserver effect on the sentinel.

  const fetchNext = useCallback(async () => {
    if (loadingRef.current || done) return

    loadingRef.current = true
    setLoading(true)

    try {
      const nextItems = await loadMore()
      if (nextItems.length === 0) {
        setDone(true)
      } else {
        setItems(prev => [...prev, ...nextItems])
      }
    } finally {
      loadingRef.current = false;
      setLoading(false)
    }
  }, [loadMore, done])

  useEffect(() => {
    fetchNext()
  }, [fetchNext])

  useEffect(() => {
    const sentinel = sentinelRef.current

    if (!sentinel) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNext()
      }
    })

    observer.observe(sentinel)

    return () => {
      observer.disconnect()
    }
  }, [fetchNext])
  
  return (
    <div>
      <ul>
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
      {loading && <p data-testid="loading">Loading...</p>}
      {done && <p data-testid="end">No more items</p>}
      <div data-testid="sentinel" ref={sentinelRef} />
    </div>
  )
}
