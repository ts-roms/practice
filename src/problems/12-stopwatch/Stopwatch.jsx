import { useState, useRef, useEffect } from 'react'

/**
 * PROBLEM 12 — Stopwatch (intervals + cleanup)
 *
 * Requirements (see Stopwatch.test.jsx):
 *  - data-testid="time" shows elapsed whole seconds, starting at 0.
 *  - "Start" begins counting up 1 per second (use setInterval).
 *  - "Stop" pauses (clears the interval) — time is preserved.
 *  - "Reset" sets time back to 0 (and stops).
 *  - Starting again resumes from the current time.
 *  - The interval MUST be cleared on stop and on unmount (no leaks/double-count).
 */
export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  // TODO: useEffect keyed on `running` — start an interval when running,
  //       return cleanup that clears it. Reset should stop + zero the time.
  //


  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [running])

  const reset = () => {
    setRunning(false)
    setSeconds(0)
  }

  return (
    <div>
      <p data-testid="time">{seconds}</p>
      <button onClick={() => setRunning(true)}>Start</button>
      <button onClick={() => setRunning(false)}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
