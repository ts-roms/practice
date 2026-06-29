import { useState } from 'react'

const WINS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],            // diagonals
]

function getWinner(board) {
  for (const [a, b, c] of WINS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: [a, b, c] }
    }
  }
  return null
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const winner = getWinner(board)
  const isDraw = !winner && board.every(Boolean)
  const status = winner ? `Winner: ${winner.player}` : isDraw ? 'Draw' : `Turn: ${xIsNext ? 'X' : 'O'}`

  const handleClick = (i) => {
    if (board[i] || winner) return // occupied or game over
    const next = [...board]
    next[i] = xIsNext ? 'X' : 'O'
    setBoard(next)
    setXIsNext((p) => !p)
  }

  const reset = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }

  return (
    <div>
      <p data-testid="status">{status}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 48px)', gap: 4 }}>
        {board.map((cell, i) => (
          <button
            key={i}
            data-testid={`cell-${i}`}
            onClick={() => handleClick(i)}
            style={{
              height: 48,
              fontSize: 20,
              background: winner?.line.includes(i) ? '#dafbe1' : '#fff',
            }}
          >
            {cell}
          </button>
        ))}
      </div>
      <button onClick={reset} style={{ marginTop: 8 }}>Reset</button>
    </div>
  )
}
