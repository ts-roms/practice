import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { preStyle, mdCodeCss } from './codeTheme.js'

// Pull specs, tests, and solutions as raw text via glob (no manual imports).
const specs = import.meta.glob('./mock-questions/*/README.md', { query: '?raw', import: 'default', eager: true })
const tests = import.meta.glob('./mock-questions/*/*.test.{js,jsx}', { query: '?raw', import: 'default', eager: true })
const solutions = import.meta.glob('../_solutions/mock-*', { query: '?raw', import: 'default', eager: true })

const basename = (p) => p.split('/').pop()
const pick = (map, sub) =>
  Object.entries(map)
    .filter(([p]) => p.includes(sub))
    .map(([p, code]) => ({ name: basename(p), code }))

const QUESTIONS = [
  { id: 'Q1 Shopping Cart', dir: 'q1-shopping-cart', sol: 'mock-q1' },
  { id: 'Q2 Users Directory', dir: 'q2-users-directory', sol: 'mock-q2' },
  { id: 'Q3 EventEmitter', dir: 'q3-event-emitter', sol: 'mock-q3' },
  { id: 'Q4 Tasks CRUD', dir: 'q4-crud-app', sol: 'mock-q4' },
].map((q) => ({
  ...q,
  spec: pick(specs, `/${q.dir}/`)[0]?.code ?? '',
  tests: pick(tests, `/${q.dir}/`),
  solutions: pick(solutions, `${q.sol}-`),
}))

const mdStyles = `
.mq-md { line-height: 1.6; color: #24292f; }
.mq-md h1 { font-size: 1.5rem; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
.mq-md h2 { font-size: 1.15rem; margin-top: 1.3em; }
${mdCodeCss('mq-md')}
.mq-md table { border-collapse: collapse; margin: 1em 0; }
.mq-md th, .mq-md td { border: 1px solid #d0d7de; padding: 6px 12px; text-align: left; }
.mq-md th { background: #f6f8fa; }
.mq-md blockquote { color: #57606a; border-left: .25em solid #d0d7de; padding: 0 1em; margin: 0; font-style: italic; }
`

const codeBlock = (files) => (
  <div style={{ marginTop: 10 }}>
    {files.map((f) => (
      <div key={f.name}>
        <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#666', margin: '8px 0 2px' }}>{f.name}</div>
        <pre style={{ ...preStyle, margin: 0 }}>
          <code>{f.code}</code>
        </pre>
      </div>
    ))}
  </div>
)

export default function MockQuestions() {
  const [active, setActive] = useState(0)
  const [panel, setPanel] = useState('spec') // 'spec' | 'tests' | 'solution'
  const q = QUESTIONS[active]

  const pickQ = (i) => {
    setActive(i)
    setPanel('spec')
  }

  const subTab = (key, label) => (
    <button
      onClick={() => setPanel(key)}
      style={{
        padding: '5px 12px',
        background: panel === key ? '#1f6feb' : '#eee',
        color: panel === key ? '#fff' : '#000',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: 13,
      }}
    >
      {label}
    </button>
  )

  return (
    <div>
      <style>{mdStyles}</style>
      <p style={{ color: '#666', marginTop: 0 }}>
        Full-format mock exam. Implement in the files under{' '}
        <code>src/mock-questions/{q.dir}/</code>, then run{' '}
        <code>npx vitest run src/mock-questions/{q.dir}</code>.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '0.75rem' }}>
        {QUESTIONS.map((item, i) => (
          <button
            key={item.id}
            onClick={() => pickQ(i)}
            style={{
              padding: '6px 10px',
              background: i === active ? '#1f6feb' : '#eee',
              color: i === active ? '#fff' : '#000',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            {item.id}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: '0.75rem', borderBottom: '1px solid #eee', paddingBottom: 8 }}>
        {subTab('spec', 'Spec')}
        {subTab('tests', `Tests (${q.tests.length})`)}
        {subTab('solution', 'Solution')}
      </div>

      {panel === 'spec' && (
        <div className="mq-md">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.spec}</ReactMarkdown>
        </div>
      )}
      {panel === 'tests' && codeBlock(q.tests)}
      {panel === 'solution' && codeBlock(q.solutions)}
    </div>
  )
}
