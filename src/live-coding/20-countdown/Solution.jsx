import { useState, useEffect } from 'react'

export default function Countdown({ initialSeconds = 10 }) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [running])

  // Stop automatically when it hits zero.
  useEffect(() => {
    if (seconds === 0) setRunning(false)
  }, [seconds])

  const reset = () => {
    setRunning(false)
    setSeconds(initialSeconds)
  }

  return (
    <div>
      <p data-testid="remaining">{seconds}</p>
      {seconds === 0 && <p data-testid="done">Done!</p>}
      <button onClick={() => setRunning(true)} disabled={running || seconds === 0}>Start</button>
      <button onClick={() => setRunning(false)} disabled={!running}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
