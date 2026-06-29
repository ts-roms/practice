import { useState } from 'react'

// Senior 4 — Virtualized list. See CHALLENGE.md.
export default function VirtualList({ items = [], rowHeight = 30, height = 300 }) {
  const [scrollTop, setScrollTop] = useState(0)

  // TODO: compute the visible index range from scrollTop, slice items,
  //       and absolutely-position each rendered row. Spacer = total height.

  return (
    <div data-testid="viewport" style={{ height, overflow: 'auto' }}>
      {/* TODO: spacer + visible rows */}
    </div>
  )
}
