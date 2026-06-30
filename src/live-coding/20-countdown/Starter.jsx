import { useState, useEffect } from 'react'

// Live coding 20 — Countdown Timer. Build from CHALLENGE.md.
export default function Countdown({ initialSeconds = 10 }) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [running, setRunning] = useState(false)

  // TODO: interval (useEffect on `running`) that decrements; stop at 0; reset().

  return (
    <div>
      <p data-testid="remaining">{seconds}</p>
      <button onClick={() => setRunning(true)}>Start</button>
      <button onClick={() => setRunning(false)}>Pause</button>
      <button>Reset</button>
    </div>
  )
}
