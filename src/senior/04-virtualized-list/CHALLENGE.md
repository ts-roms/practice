# Senior 4 — Virtualized list (windowing)  ⏱ 25 min

## Prompt

> "We need to render a list of 10,000 rows without killing the browser. Build a
> virtualized list: only the rows visible in the scroll viewport should be in the
> DOM. Assume a fixed row height."

## Requirements

- Props: `items`, `rowHeight` (default 30), `height` (viewport height, default 300).
- A scrollable viewport (`data-testid="viewport"`) of `height` px.
- An inner spacer of `items.length * rowHeight` px so the scrollbar is correct.
- Only render the rows in view (plus a small overscan). Each rendered row is
  `data-testid="row-{index}"`, absolutely positioned at `index * rowHeight`.
- As the user scrolls, the rendered window updates.

## Why it's a senior question

- Tests understanding of **why** long lists are slow (thousands of DOM nodes) and
  the windowing fix used by `react-window` / `react-virtualized`.
- Maps scroll position → visible index range (`floor(scrollTop / rowHeight)`).

## Likely follow-ups

1. "Variable row heights?" → measured offsets / a prefix-sum index (much harder).
2. "Add overscan and explain why." → render a few extra rows to avoid blank flashes.
3. "Would you build this yourself in prod?" → no — use `react-window`; but know how.

## What's evaluated

- Correct visible-range math and the spacer element.
- Keeping DOM node count ~constant regardless of `items.length`.
- Reading `scrollTop` from the scroll event into state.

Reference: `Solution.jsx`. Self-check: `npx vitest run src/senior/04-virtualized-list`
