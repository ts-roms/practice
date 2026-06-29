import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { preStyle, mdCodeCss } from './codeTheme.js'

import overview from './live-coding/README.md?raw'
import c1 from './live-coding/01-tic-tac-toe/CHALLENGE.md?raw'
import s1 from './live-coding/01-tic-tac-toe/Solution.jsx?raw'
import c2 from './live-coding/02-typeahead/CHALLENGE.md?raw'
import s2 from './live-coding/02-typeahead/Solution.jsx?raw'
import c3 from './live-coding/03-traffic-light/CHALLENGE.md?raw'
import s3 from './live-coding/03-traffic-light/Solution.jsx?raw'
import c4 from './live-coding/04-debounce-throttle/CHALLENGE.md?raw'
import s4 from './live-coding/04-debounce-throttle/solution.js?raw'
import c5 from './live-coding/05-array-utils/CHALLENGE.md?raw'
import s5 from './live-coding/05-array-utils/solution.js?raw'
import c6 from './live-coding/06-otp-input/CHALLENGE.md?raw'
import s6 from './live-coding/06-otp-input/Solution.jsx?raw'
import c7 from './live-coding/07-tags-input/CHALLENGE.md?raw'
import s7 from './live-coding/07-tags-input/Solution.jsx?raw'
import c8 from './live-coding/08-nested-comments/CHALLENGE.md?raw'
import s8 from './live-coding/08-nested-comments/Solution.jsx?raw'
import c9 from './live-coding/09-calculator/CHALLENGE.md?raw'
import s9 from './live-coding/09-calculator/Solution.jsx?raw'
import c10 from './live-coding/10-curry-compose/CHALLENGE.md?raw'
import s10 from './live-coding/10-curry-compose/solution.js?raw'
import c11 from './live-coding/11-promise-utils/CHALLENGE.md?raw'
import s11 from './live-coding/11-promise-utils/solution.js?raw'
import c12 from './live-coding/12-carousel/CHALLENGE.md?raw'
import s12 from './live-coding/12-carousel/Solution.jsx?raw'
import c13 from './live-coding/13-form-wizard/CHALLENGE.md?raw'
import s13 from './live-coding/13-form-wizard/Solution.jsx?raw'
import c14 from './live-coding/14-toasts/CHALLENGE.md?raw'
import s14 from './live-coding/14-toasts/Solution.jsx?raw'
import c15 from './live-coding/15-custom-hooks/CHALLENGE.md?raw'
import s15 from './live-coding/15-custom-hooks/solution.js?raw'

// Test sources (only the JS challenges have automated tests; React ones are
// judged by clicking, like a real live round).
const tests = import.meta.glob('./live-coding/*/*.test.{js,jsx}', { query: '?raw', import: 'default', eager: true })
const testFor = (dir) => {
  const hit = Object.entries(tests).find(([p]) => p.includes(`/${dir}/`))
  return hit ? hit[1] : null
}

const ITEMS = [
  { id: 'Overview', prompt: overview, solution: null, dir: null },
  { id: '1 Tic-Tac-Toe', prompt: c1, solution: s1, dir: '01-tic-tac-toe' },
  { id: '2 Typeahead', prompt: c2, solution: s2, dir: '02-typeahead' },
  { id: '3 Traffic Light', prompt: c3, solution: s3, dir: '03-traffic-light' },
  { id: '4 debounce/throttle', prompt: c4, solution: s4, dir: '04-debounce-throttle' },
  { id: '5 Array utils', prompt: c5, solution: s5, dir: '05-array-utils' },
  { id: '6 OTP Input', prompt: c6, solution: s6, dir: '06-otp-input' },
  { id: '7 Tags Input', prompt: c7, solution: s7, dir: '07-tags-input' },
  { id: '8 Nested Comments', prompt: c8, solution: s8, dir: '08-nested-comments' },
  { id: '9 Calculator', prompt: c9, solution: s9, dir: '09-calculator' },
  { id: '10 curry/compose', prompt: c10, solution: s10, dir: '10-curry-compose' },
  { id: '11 Promise utils', prompt: c11, solution: s11, dir: '11-promise-utils' },
  { id: '12 Carousel', prompt: c12, solution: s12, dir: '12-carousel' },
  { id: '13 Form Wizard', prompt: c13, solution: s13, dir: '13-form-wizard' },
  { id: '14 Toasts', prompt: c14, solution: s14, dir: '14-toasts' },
  { id: '15 Custom Hooks', prompt: c15, solution: s15, dir: '15-custom-hooks' },
]

const mdStyles = `
.lc-md { line-height: 1.6; color: #24292f; }
.lc-md h1 { font-size: 1.5rem; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
.lc-md h2 { font-size: 1.2rem; margin-top: 1.4em; }
${mdCodeCss('lc-md')}
.lc-md table { border-collapse: collapse; margin: 1em 0; }
.lc-md th, .lc-md td { border: 1px solid #d0d7de; padding: 6px 12px; text-align: left; }
.lc-md th { background: #f6f8fa; }
.lc-md blockquote { color: #57606a; border-left: .25em solid #d0d7de; padding: 0 1em; margin: 0; font-style: italic; }
`

export default function LiveCoding() {
  const [active, setActive] = useState(0)
  const [panel, setPanel] = useState('prompt') // 'prompt' | 'tests' | 'solution'
  const item = ITEMS[active]
  const testSrc = item.dir ? testFor(item.dir) : null

  const pick = (i) => {
    setActive(i)
    setPanel('prompt')
  }

  const subTab = (key, label, accent) => (
    <button
      onClick={() => setPanel(key)}
      style={{
        padding: '5px 12px',
        background: panel === key ? accent : '#eee',
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
              background: i === active ? '#8250df' : '#eee',
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
          {subTab('prompt', 'Prompt', '#8250df')}
          {subTab('tests', testSrc ? 'Tests' : 'Tests (none)', '#8250df')}
          {subTab('solution', 'Solution', '#8250df')}
        </div>
      )}

      {panel === 'prompt' && (
        <div className="lc-md">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.prompt}</ReactMarkdown>
        </div>
      )}

      {panel === 'tests' && (
        testSrc ? (
          <pre style={preStyle}>
            <code>{testSrc}</code>
          </pre>
        ) : (
          <p style={{ color: '#666' }}>
            No automated test — this is a UI challenge judged by clicking through it
            (just like a real live-coding round). Build it, then verify by interacting.
          </p>
        )
      )}

      {panel === 'solution' && item.solution && (
        <pre style={{ background: '#f6f8fa', padding: 14, borderRadius: 8, overflow: 'auto' }}>
          <code>{item.solution}</code>
        </pre>
      )}
    </div>
  )
}
