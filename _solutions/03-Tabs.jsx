import { useState } from 'react'

export default function Tabs({ tabs = [] }) {
  const [active, setActive] = useState(0)
  return (
    <div>
      <div role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div data-testid="panel">{tabs[active]?.content}</div>
    </div>
  )
}
