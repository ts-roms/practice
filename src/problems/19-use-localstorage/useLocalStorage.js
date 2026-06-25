import { useState } from 'react'

/**
 * PROBLEM 19 — Custom hook: useLocalStorage
 *
 * A useState-like hook that persists to localStorage.
 *
 * Requirements (see useLocalStorage.test.jsx):
 *   useLocalStorage(key, initialValue) => [value, setValue]
 *   - On first render, read the key from localStorage. If present, JSON.parse it;
 *     otherwise use initialValue.
 *   - setValue updates state AND writes JSON.stringify(value) to localStorage.
 *   - setValue must support a functional updater, like useState:
 *       setValue(prev => prev + 1)
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue)

  // TODO: lazy-initialize state from localStorage (use the useState initializer fn).
  // TODO: a setter that supports a value OR an updater fn, and writes to localStorage.

  const setStoredValue = (next) => {
    // TODO
    setValue(next)
  }

  return [value, setStoredValue]
}
