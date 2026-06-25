import { useState, useEffect } from 'react'

/**
 * PROBLEM 20 — Custom hook: useDebounce
 *
 * Returns a debounced copy of `value` that only updates after `value` has
 * stopped changing for `delay` ms.
 *
 * Requirements (see useDebounce.test.jsx):
 *   useDebounce(value, delay) => debouncedValue
 *   - Initially returns the current value (no wait on first render).
 *   - When `value` changes, the returned value updates `delay` ms later.
 *   - If `value` changes again before `delay` elapses, the timer resets, so only
 *     the latest value is emitted.
 *   - Clean up the timer on each change / unmount.
 */
export function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)

  // TODO: useEffect on [value, delay] that setTimeouts setDebounced(value),
  //       and clears the timer in cleanup.

  return debounced
}
