import { useState } from 'react'

// Senior 5 — optimize this so unrelated updates don't re-render rows, and
// selecting only re-renders the changed rows. See CHALLENGE.md.
//
// Currently UN-optimized: Row is not memoized and onSelect is a new function
// every render, so everything re-renders constantly.

function Row({ item, isSelected, onSelect, onRender }) {
  onRender(item.id) // render counter for the test
  return (
    <li
      data-testid={`row-${item.id}`}
      onClick={() => onSelect(item.id)}
      style={{ fontWeight: isSelected ? 'bold' : 'normal', cursor: 'pointer' }}
    >
      {item.name}
    </li>
  )
}

export default function MemoList({ items = [], onRender = () => {} }) {
  const [selectedId, setSelectedId] = useState(null)
  const [tick, setTick] = useState(0)

  // TODO: make onSelect stable (useCallback) and memoize Row.
  const onSelect = (id) => setSelectedId(id)

  return (
    <div>
      <button onClick={() => setTick((t) => t + 1)}>tick {tick}</button>
      <ul>
        {items.map((item) => (
          <Row
            key={item.id}
            item={item}
            isSelected={item.id === selectedId}
            onSelect={onSelect}
            onRender={onRender}
          />
        ))}
      </ul>
    </div>
  )
}
