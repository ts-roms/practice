import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Vite imports the markdown files as raw strings (the `?raw` suffix).
import startHere from '../START_HERE.md?raw'
import studyGuide from '../STUDY_GUIDE.md?raw'
import mockTest from '../MOCK_TEST.md?raw'
import readme from '../README.md?raw'

const DOCS = [
  { id: 'START_HERE', md: startHere },
  { id: 'STUDY_GUIDE', md: studyGuide },
  { id: 'MOCK_TEST', md: mockTest },
  { id: 'README', md: readme },
]

// Minimal GitHub-ish styling for rendered markdown.
const mdStyles = `
.md { line-height: 1.6; color: #24292f; }
.md h1 { font-size: 1.7rem; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
.md h2 { font-size: 1.3rem; border-bottom: 1px solid #eaecef; padding-bottom: .3em; margin-top: 1.6em; }
.md h3 { font-size: 1.1rem; margin-top: 1.4em; }
.md code { background: #f6f8fa; padding: .15em .4em; border-radius: 6px; font-size: 85%; }
.md pre { background: #f6f8fa; padding: 12px 14px; border-radius: 8px; overflow: auto; }
.md pre code { background: none; padding: 0; }
.md table { border-collapse: collapse; width: 100%; margin: 1em 0; display: block; overflow-x: auto; }
.md th, .md td { border: 1px solid #d0d7de; padding: 6px 12px; text-align: left; }
.md th { background: #f6f8fa; }
.md blockquote { color: #57606a; border-left: .25em solid #d0d7de; padding: 0 1em; margin: 0; }
.md a { color: #0969da; text-decoration: none; }
.md a:hover { text-decoration: underline; }
.md hr { border: none; border-top: 1px solid #eaecef; margin: 1.5em 0; }
`

export default function DocsViewer() {
  const [active, setActive] = useState(0)
  return (
    <div>
      <style>{mdStyles}</style>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '0 0 1rem' }}>
        {DOCS.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setActive(i)}
            style={{
              padding: '6px 10px',
              background: i === active ? '#0969da' : '#eee',
              color: i === active ? '#fff' : '#000',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontFamily: 'monospace',
            }}
          >
            {d.id}
          </button>
        ))}
      </div>
      <div className="md">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{DOCS[active].md}</ReactMarkdown>
      </div>
    </div>
  )
}
