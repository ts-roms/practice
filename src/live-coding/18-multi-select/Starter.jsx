import { useState, useRef, useEffect } from 'react'

const ITEMS = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' },
  { id: 4, name: 'Date' },
]

// Live coding 18 — Multi-select with Select all (indeterminate). See CHALLENGE.md.
export default function MultiSelect({ items = ITEMS }) {
  const [selected, setSelected] = useState(() => new Set())
  const allRef = useRef(null)

  // TODO: derive allChecked / someChecked; set allRef.current.indeterminate in an effect;
  //       toggle(id) and toggleAll().

  return (
    <div>
      <label>
        <input ref={allRef} type="checkbox" data-testid="select-all" /> Select all
      </label>
      {/* TODO: item checkboxes + selected count */}
    </div>
  )
}
