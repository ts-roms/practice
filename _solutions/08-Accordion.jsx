import { useState } from 'react'

// FIXED version (reference). Bugs addressed:
//  1) openIndex (single) -> openIds Set, so multiple can be open.
//  2) key={i} -> stable key from content/title.
//  3) toggle returns a NEW Set instead of mutating.
export default function Accordion({ sections = [] }) {
  const [openIds, setOpenIds] = useState(() => new Set())

  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <div>
      {sections.map((s) => (
        <div key={s.title}>
          <button onClick={() => toggle(s.title)}>{s.title}</button>
          {openIds.has(s.title) && <p>{s.body}</p>}
        </div>
      ))}
    </div>
  )
}
