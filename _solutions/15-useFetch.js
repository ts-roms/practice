import { useState, useEffect, useCallback } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadCount, setReloadCount] = useState(0)

  const refetch = useCallback(() => setReloadCount((c) => c + 1), [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    ;(async () => {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const json = await res.json()
        if (!cancelled) {
          setData(json)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err)
          setData(null)
          setLoading(false)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [url, reloadCount])

  return { data, loading, error, refetch }
}
