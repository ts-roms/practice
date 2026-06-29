import { useState, useRef } from 'react'

// Live coding 6 — OTP Input. Build from CHALLENGE.md.
// Key idea: an array of refs so you can imperatively focus the next/prev box.
export default function OtpInput({ length = 6 }) {
  const [values, setValues] = useState(Array(length).fill(''))
  const refs = useRef([])

  // TODO: handleChange(i) auto-advances; handleKeyDown(i) handles Backspace.

  return (
    <div>
      {/* TODO: render `length` single-digit inputs + the combined value */}
    </div>
  )
}
