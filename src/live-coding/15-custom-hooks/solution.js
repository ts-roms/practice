import { useState, useRef, useEffect, useCallback } from 'react'

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback((next) => {
    setValue((v) => (typeof next === 'boolean' ? next : !v))
  }, [])
  return [value, toggle, setValue]
}

export function usePrevious(value) {
  const ref = useRef(undefined)
  useEffect(() => {
    ref.current = value // runs AFTER render, so during render ref holds the prev value
  }, [value])
  return ref.current
}
