import { useState, useRef, useEffect } from 'react'

// Live coding 21 — Stopwatch using useRef for the interval id. See CHALLENGE.md.
export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const [laps, setLaps] = useState([])
  const intervalRef = useRef(null)

  // TODO: start() (guard against double-start), stop(), reset(), lap();
  //       clear the interval on unmount.

  return (
    <div>
      <p data-testid="time">{seconds}</p>
      <button>Start</button>
      <button>Stop</button>
      <button>Lap</button>
      <button>Reset</button>
      {/* TODO: render laps */}
    </div>
  )
}
