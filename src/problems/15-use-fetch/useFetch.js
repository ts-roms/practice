import { useState, useEffect, useCallback } from 'react'

/**
 * PROBLEM 15 — Custom hook: useFetch  [ADVANCED]
 *
 * Build a reusable data-fetching hook.
 *
 * Requirements (see useFetch.test.jsx):
 *   useFetch(url) returns { data, loading, error, refetch }
 *   - On mount (and whenever `url` changes), fetch the url.
 *   - `loading` is true while a request is in flight, false otherwise.
 *   - On success, `data` is the parsed JSON, `error` is null.
 *   - On a non-ok response OR a thrown/rejected fetch, `error` is set (truthy)
 *     and `data` stays null.
 *   - `refetch()` re-runs the request.
 *   - Avoid setting state after unmount (cancel flag) to prevent warnings/leaks.
 */
export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refetchKey, setRefetchKey] = useState(0)

  const refetch = useCallback(() => {
    // TODO: trigger a re-fetch (hint: bump a counter in the effect deps).
    setRefetchKey(prev => prev + 1)
  }, [])

  useEffect(() => {
    // TODO: fetch url, handle ok/!ok/catch, set state, cancel on cleanup.
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null)

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Request failed')
        }

        const json = await response.json();

        if (!cancelled) {
          setData(json);
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setData(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true;
    }
  }, [url, refetchKey])

  return { data, loading, error, refetch }
}
