import { useState, useRef } from 'react'

export default function OtpInput({ length = 6, onComplete }) {
  const [values, setValues] = useState(Array(length).fill(''))
  const refs = useRef([])

  const setValueAt = (i, v) =>
    setValues((prev) => {
      const next = [...prev]
      next[i] = v
      return next
    })

  const handleChange = (i, e) => {
    const digit = e.target.value.replace(/\D/g, '').slice(-1) // keep last digit only
    if (!digit) return
    setValueAt(i, digit)
    if (i < length - 1) refs.current[i + 1]?.focus()
    const code = values.map((v, idx) => (idx === i ? digit : v)).join('')
    if (code.length === length && !code.includes('')) onComplete?.(code)
  }

  const handleKeyDown = (i, e) => {
    if (e.key !== 'Backspace') return
    if (values[i]) {
      setValueAt(i, '')
    } else if (i > 0) {
      refs.current[i - 1]?.focus()
      setValueAt(i - 1, '')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 6 }}>
        {values.map((val, i) => (
          <input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            data-testid={`otp-input-${i}`}
            value={val}
            inputMode="numeric"
            maxLength={1}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            style={{ width: 32, height: 40, textAlign: 'center', fontSize: 18 }}
          />
        ))}
      </div>
      <p data-testid="otp-value">{values.join('')}</p>
    </div>
  )
}
