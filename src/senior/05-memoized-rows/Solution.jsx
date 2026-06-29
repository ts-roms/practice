import { useState, useCallback, memo } from 'react'

// memo: skip re-render when props are shallow-equal.
const Row = memo(function Row({ item, isSelected, onSelect, onRender }) {
  onRender(item.id)
  return (
    <li
      data-testid={`row-${item.id}`}
      onClick={() => onSelect(item.id)}
      style={{ fontWeight: isSelected ? 'bold' : 'normal', cursor: 'pointer' }}
    >
      {item.name}
    </li>
  )
})

export default function MemoList({ items = [], onRender = () => {} }) {
  const [selectedId, setSelectedId] = useState(null)
  const [tick, setTick] = useState(0)

  // Stable reference so Row's `onSelect` prop doesn't change every render
  // (without this, memo is defeated).
  const onSelect = useCallback((id) => setSelectedId(id), [])

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
