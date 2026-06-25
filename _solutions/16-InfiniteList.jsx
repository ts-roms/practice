import { useState, useEffect, useRef, useCallback } from 'react'

export default function InfiniteList({ loadMore }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const sentinelRef = useRef(null)
  const busyRef = useRef(false)
  const doneRef = useRef(false)

  const fetchNext = useCallback(async () => {
    if (busyRef.current || doneRef.current) return
    busyRef.current = true
    setLoading(true)
    try {
      const batch = await loadMore()
      if (!batch || batch.length === 0) {
        doneRef.current = true
        setDone(true)
      } else {
        setItems((prev) => [...prev, ...batch])
      }
    } finally {
      busyRef.current = false
      setLoading(false)
    }
  }, [loadMore])

  // initial load
  useEffect(() => {
    fetchNext()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // observe the sentinel
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) fetchNext()
    })
    observer.observe(el)
    return () => observer.disconnect()
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
