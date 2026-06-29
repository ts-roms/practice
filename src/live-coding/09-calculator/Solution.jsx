import { useState } from 'react'

const compute = (a, b, op) => {
  switch (op) {
    case '+': return a + b
    case '−': return a - b
    case '×': return a * b
    case '÷': return b === 0 ? NaN : a / b
    default: return b
  }
}

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState(null)
  const [op, setOp] = useState(null)
  const [overwrite, setOverwrite] = useState(true) // next digit starts a new number

  const show = (n) => (Number.isNaN(n) ? 'Error' : String(n))

  const inputDigit = (d) => {
    setDisplay((cur) => (overwrite || cur === '0' ? String(d) : cur + d))
    setOverwrite(false)
  }

  const chooseOperator = (nextOp) => {
    const current = parseFloat(display)
    if (prev !== null && op && !overwrite) {
      const result = compute(prev, current, op)
      setDisplay(show(result))
      setPrev(Number.isNaN(result) ? null : result)
    } else {
      setPrev(current)
    }
    setOp(nextOp)
    setOverwrite(true)
  }

  const equals = () => {
    if (op === null || prev === null) return
    const result = compute(prev, parseFloat(display), op)
    setDisplay(show(result))
    setPrev(null)
    setOp(null)
    setOverwrite(true)
  }

  const clear = () => {
    setDisplay('0')
    setPrev(null)
    setOp(null)
    setOverwrite(true)
  }

  const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0']
  const ops = ['+', '−', '×', '÷']

  return (
    <div style={{ width: 200 }}>
      <div data-testid="display" style={{ background: '#111', color: '#fff', padding: 10, textAlign: 'right', fontSize: 22, borderRadius: 6 }}>
        {display}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, flex: 1 }}>
          {digits.map((d) => (
            <button key={d} onClick={() => inputDigit(d)}>{d}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {ops.map((o) => (
            <button key={o} onClick={() => chooseOperator(o)}>{o}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
        <button onClick={equals} style={{ flex: 1 }}>=</button>
        <button onClick={clear} style={{ flex: 1 }}>C</button>
      </div>
    </div>
  )
}
