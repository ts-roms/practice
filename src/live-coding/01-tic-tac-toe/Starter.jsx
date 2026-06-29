import { useState } from 'react'

// Live coding 1 — Tic-Tac-Toe. Build from the prompt in CHALLENGE.md.
// Start by saying your data model out loud, then stub the grid.
export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  // TODO: handleClick(i), computed winner, status, reset.

  return (
    <div>
      {/* TODO: status line + 3x3 grid + reset */}
    </div>
  )
}
