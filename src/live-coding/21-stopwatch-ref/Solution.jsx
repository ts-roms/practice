import { useState, useRef, useEffect } from 'react'

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const [laps, setLaps] = useState([])
  const intervalRef = useRef(null) // mutable, no re-render, survives renders

  const start = () => {
    if (intervalRef.current !== null) return // already running — guard double-start
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
  }

  const stop = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  const reset = () => {
    stop()
    setSeconds(0)
    setLaps([])
  }

  const lap = () => setLaps((prev) => [...prev, seconds])

  // Clean up the interval if the component unmounts while running.
  useEffect(() => () => clearInterval(intervalRef.current), [])

  return (
    <div>
      <p data-testid="time">{seconds}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={lap}>Lap</button>
      <button onClick={reset}>Reset</button>
      <ul>
        {laps.map((l, i) => (
          <li key={i} data-testid={`lap-${i}`}>
            Lap {i + 1}: {l}s
          </li>
        ))}
      </ul>
    </div>
  )
}
