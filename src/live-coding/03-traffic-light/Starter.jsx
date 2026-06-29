import { useState, useEffect } from 'react'

// Live coding 3 — Traffic Light. Build from CHALLENGE.md.
// Model the cycle as a state machine, then drive it with a timer (+ cleanup!).
const ORDER = ['green', 'yellow', 'red']
const DURATION = { green: 3000, yellow: 1000, red: 2000 }

export default function TrafficLight() {
  const [current, setCurrent] = useState('green')
  const [running, setRunning] = useState(true)

  // TODO: useEffect that advances current -> next after DURATION[current] when running.

  return (
    <div>
      {/* TODO: render the three lights + active indicator + pause/resume */}
    </div>
  )
}
