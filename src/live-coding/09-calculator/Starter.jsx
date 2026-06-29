import { useState } from 'react'

// Live coding 9 — Calculator. Build from CHALLENGE.md.
// Model it as a state machine: display, prev, op, overwrite.
export default function Calculator() {
  const [display, setDisplay] = useState('0')

  // TODO: inputDigit, chooseOperator, equals, clear (+ a compute helper).

  return (
    <div>
      <div data-testid="display">{display}</div>
      {/* TODO: digit + operator + = + C buttons */}
    </div>
  )
}
