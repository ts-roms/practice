import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { preStyle, mdCodeCss } from './codeTheme.js'

import overview from './senior/README.md?raw'
import c1 from './senior/01-build-tree/CHALLENGE.md?raw'
import s1 from './senior/01-build-tree/solution.js?raw'
import c2 from './senior/02-tree-aggregate/CHALLENGE.md?raw'
import s2 from './senior/02-tree-aggregate/solution.js?raw'
import c3 from './senior/03-data-pipeline/CHALLENGE.md?raw'
import s3 from './senior/03-data-pipeline/solution.js?raw'
import c4 from './senior/04-virtualized-list/CHALLENGE.md?raw'
import s4 from './senior/04-virtualized-list/Solution.jsx?raw'
import c5 from './senior/05-memoized-rows/CHALLENGE.md?raw'
import s5 from './senior/05-memoized-rows/Solution.jsx?raw'

const tests = import.meta.glob('./senior/*/*.test.{js,jsx}', { query: '?raw', import: 'default', eager: true })
const testFor = (dir) => {
  const hit = Object.entries(tests).find(([p]) => p.includes(`/${dir}/`))
  return hit ? hit[1] : null
}

const ITEMS = [
  { id: 'Overview', prompt: overview, solution: null, dir: null },
  { id: '1 Build Tree', prompt: c1, solution: s1, dir: '01-build-tree' },
  { id: '2 Tree Aggregate', prompt: c2, solution: s2, dir: '02-tree-aggregate' },
  { id: '3 Data Pipeline', prompt: c3, solution: s3, dir: '03-data-pipeline' },
  { id: '4 Virtualized List', prompt: c4, solution: s4, dir: '04-virtualized-list' },
  { id: '5 Memoized Rows', prompt: c5, solution: s5, dir: '05-memoized-rows' },
]

const mdStyles = `
.sr-md { line-height: 1.6; color: #24292f; }
.sr-md h1 { font-size: 1.5rem; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
.sr-md h2 { font-size: 1.2rem; margin-top: 1.4em; }
${mdCodeCss('sr-md')}
.sr-md table { border-collapse: collapse; margin: 1em 0; }
.sr-md th, .sr-md td { border: 1px solid #d0d7de; padding: 6px 12px; text-align: left; }
.sr-md th { background: #f6f8fa; }
.sr-md blockquote { color: #57606a; border-left: .25em solid #d0d7de; padding: 0 1em; margin: 0; font-style: italic; }
`

export default function Senior() {
  const [active, setActive] = useState(0)
  const [panel, setPanel] = useState('prompt') // 'prompt' | 'tests' | 'solution'
  const item = ITEMS[active]
  const testSrc = item.dir ? testFor(item.dir) : null

  const pick = (i) => {
    setActive(i)
    setPanel('prompt')
  }

  const subTab = (key, label) => (
    <button
      onClick={() => setPanel(key)}
      style={{
        padding: '5px 12px',
        background: panel === key ? '#bf3989' : '#eee',
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '0.75rem' }}>
        {ITEMS.map((it, i) => (
          <button
            key={it.id}
            onClick={() => pick(i)}
            style={{
              padding: '6px 10px',
              background: i === active ? '#bf3989' : '#eee',
              color: i === active ? '#fff' : '#000',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            {it.id}
          </button>
        ))}
      </div>

      {item.id !== 'Overview' && (
        <div style={{ display: 'flex', gap: 6, marginBottom: '0.75rem', borderBottom: '1px solid #eee', paddingBottom: 8 }}>
          {subTab('prompt', 'Prompt')}
          {subTab('tests', 'Tests')}
          {subTab('solution', 'Solution')}
        </div>
      )}

      {panel === 'prompt' && (
        <div className="sr-md">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.prompt}</ReactMarkdown>
        </div>
      )}

      {panel === 'tests' && (
        testSrc ? (
          <pre style={preStyle}>
            <code>{testSrc}</code>
          </pre>
        ) : (
          <p style={{ color: '#666' }}>No test file for this item.</p>
        )
      )}

      {panel === 'solution' && item.solution && (
        <pre style={preStyle}>
          <code>{item.solution}</code>
        </pre>
      )}
    </div>
  )
}
