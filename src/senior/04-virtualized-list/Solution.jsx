import { useState } from 'react'

export default function VirtualList({ items = [], rowHeight = 30, height = 300, overscan = 1 }) {
  const [scrollTop, setScrollTop] = useState(0)

  const total = items.length
  const visibleCount = Math.ceil(height / rowHeight)
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
  const endIndex = Math.min(total, Math.floor(scrollTop / rowHeight) + visibleCount + overscan)
  const slice = items.slice(startIndex, endIndex)

  return (
    <div
      data-testid="viewport"
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height, overflow: 'auto' }}
    >
      {/* spacer keeps the scrollbar proportional to the full list */}
      <div style={{ height: total * rowHeight, position: 'relative' }}>
        {slice.map((item, i) => {
          const index = startIndex + i
          return (
            <div
              key={index}
              data-testid={`row-${index}`}
              style={{ position: 'absolute', top: index * rowHeight, left: 0, right: 0, height: rowHeight }}
            >
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}
