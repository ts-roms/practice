import { useState } from 'react'
import { QUESTIONS } from './questions.js'

// Interactive MCQ quiz. (Also a decent reference for a "build a quiz" coding task:
// current index, selected answer, locked-in feedback, score, restart.)
export default function Quiz() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const total = QUESTIONS.length
  const current = QUESTIONS[index]
  const answered = selected !== null

  const choose = (i) => {
    if (answered) return // lock after first answer
    setSelected(i)
    if (i === current.answer) setScore((s) => s + 1)
  }

  const next = () => {
    if (index + 1 >= total) {
      setFinished(true)
      return
    }
    setIndex((n) => n + 1)
    setSelected(null)
  }

  const restart = () => {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / total) * 100)
    return (
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h2>Score: {score} / {total} ({pct}%)</h2>
        <p style={{ color: '#666' }}>
          {pct >= 85 ? 'Strong — you are ready.' : pct >= 65 ? 'Solid mid-level. Review misses.' : 'Review the STUDY_GUIDE and retry.'}
        </p>
        <button onClick={restart} style={btn('#0969da')}>Restart</button>
      </div>
    )
  }

  const optionStyle = (i) => {
    let bg = '#f6f8fa'
    let border = '#d0d7de'
    if (answered) {
      if (i === current.answer) {
        bg = '#dafbe1'
        border = '#2da44e'
      } else if (i === selected) {
        bg = '#ffebe9'
        border = '#cf222e'
      }
    }
    return {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      padding: '10px 14px',
      margin: '6px 0',
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: 8,
      cursor: answered ? 'default' : 'pointer',
      fontSize: '0.95rem',
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: 14 }}>
        <span>Question {index + 1} of {total}</span>
        <span>Score: {score}</span>
      </div>
      <div style={{ height: 6, background: '#eee', borderRadius: 3, margin: '8px 0 16px' }}>
        <div style={{ height: '100%', width: `${((index) / total) * 100}%`, background: '#0969da', borderRadius: 3 }} />
      </div>

      <h3 style={{ marginTop: 0 }}>{current.q}</h3>
      {current.options.map((opt, i) => (
        <button key={i} onClick={() => choose(i)} style={optionStyle(i)} disabled={answered}>
          {opt}
        </button>
      ))}

      {answered && (
        <div style={{ marginTop: 12, padding: 12, background: '#f6f8fa', borderRadius: 8, fontSize: 14 }}>
          <strong>{selected === current.answer ? '✅ Correct' : '❌ Incorrect'}</strong>
          <p style={{ margin: '6px 0 0' }}>{current.explain}</p>
          <button onClick={next} style={{ ...btn('#111'), marginTop: 10 }}>
            {index + 1 >= total ? 'See results' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  )
}

const btn = (bg) => ({
  padding: '8px 16px',
  background: bg,
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 600,
})
