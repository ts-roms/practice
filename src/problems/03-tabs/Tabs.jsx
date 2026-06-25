import { useState } from 'react'

/**
 * PROBLEM 03 — Tabs
 *
 * Props: tabs = [{ label, content }, ...]
 *
 * Requirements (see Tabs.test.jsx):
 *  - Render one <button role="tab"> per tab (label as its text).
 *  - First tab active by default.
 *  - The active tab button has aria-selected="true"; others "false".
 *  - Only the active tab's content is shown, inside data-testid="panel".
 *  - Clicking a tab activates it and swaps the content.
 */
export default function Tabs({ tabs = [] }) {
  const [active, setActive] = useState(0)

  // TODO: render the tab buttons (set aria-selected) and the active panel.

  return (
    <div>
      <div role="tablist">{/* TODO */}
        {tabs.map((tab, index) => <button
          key={tab.label}
          role="tab"
          aria-selected={active === index}
          onClick={() => setActive(index)}
          
        >{tab.label}</button>)}
      </div>
      <div data-testid="panel">{/* TODO: tabs[active]?.content */}
        {tabs[active]?.content}
      </div>
    </div>
  )
}
