import { useState, useRef } from "react";

/**
 * PROBLEM 17 — Drag-to-reorder list  [ADVANCED]
 *
 * Props: initialItems = string[]
 *
 * Requirements (see ReorderList.test.jsx):
 *  - Render each item as a draggable <li> with data-testid={`item-${value}`}.
 *  - Implement HTML5 drag handlers so dropping item X onto item Y moves X to Y's
 *    position (remove from old index, insert at the target index).
 *  - Order is reflected by the order of <li> elements.
 *
 * Hints:
 *  - Track the dragged index in a ref (useRef) set in onDragStart.
 *  - onDragOver must call e.preventDefault() to allow a drop.
 *  - onDrop computes the new array immutably and updates state.
 */
export default function ReorderList({ initialItems = [] }) {
  const [items, setItems] = useState(initialItems);
  const dragIndex = useRef(null);

  // TODO: onDragStart(i), onDragOver(e), onDrop(i) with immutable reorder.
  //
  const onDragStart = (index) => {
    dragIndex.current = index;
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (targetIndex) => {
    const sourceIndex = dragIndex.current;

    if (sourceIndex === null || sourceIndex === targetIndex) {
      dragIndex.current = null;
      return;
    }

    setItems((prev) => {
      const updated = [...prev];

      const [draggedItem] = updated.splice(sourceIndex, 1);

      updated.splice(targetIndex, 0, draggedItem);

      return updated;
    });

    dragIndex.current = null;
  };

  return (
    <ul>
      {items.map((it, index) => (
        <li
          key={it}
          draggable
          data-testid={`item-${it}`}
          onDragStart={() => onDragStart(index)}
          onDragOver={onDragOver}
          onDrop={() => onDrop(index)}
        >
          {it}
        </li>
      ))}
    </ul>
  );
}
