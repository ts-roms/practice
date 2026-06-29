import { useState, useEffect } from 'react'

const ORDER = ['green', 'yellow', 'red']
const DURATION = { green: 3000, yellow: 1000, red: 2000 }

export default function TrafficLight() {
  const [current, setCurrent] = useState('green')
  const [running, setRunning] = useState(true)

  const advance = () => setCurrent((c) => ORDER[(ORDER.indexOf(c) + 1) % ORDER.length])

  useEffect(() => {
    if (!running) return
    const id = setTimeout(advance, DURATION[current])
    return () => clearTimeout(id)
  }, [current, running])

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 60 }}>
        {['red', 'yellow', 'green'].map((color) => (
          <div
            key={color}
            style={{
              height: 50,
              borderRadius: '50%',
              background: current === color ? color : '#ddd',
              border: '2px solid #333',
            }}
          />
        ))}
      </div>
      <p data-testid="active-light">{current}</p>
      <button onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Resume'}</button>
      <button onClick={advance}>Next</button>
    </div>
  )
}
