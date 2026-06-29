# Senior 5 — Stop the list re-rendering  ⏱ 25 min

## Prompt

> "Here's a list where selecting a row works, but the whole list re-renders on
> *any* parent state change, and selecting one row re-renders all of them. Make
> it so unrelated parent updates don't touch the rows, and selecting only
> re-renders the rows whose selected-state actually changed."

## The setup (`Starter.jsx`)

- A parent holds `selectedId` and an unrelated `tick` counter (a button).
- Each `Row` calls `onRender(item.id)` in its body (so we can count renders).
- Currently: clicking the unrelated button re-renders every row; selecting a row
  re-renders every row.

## Goal

- Clicking the unrelated button re-renders **no** rows.
- Selecting a row re-renders **only** the row whose `isSelected` changed.

## The three tools (explain each)

1. **`React.memo(Row)`** — skip a row's render when its props are shallow-equal.
2. **`useCallback`** for `onSelect` — so the handler prop is a *stable reference*
   (otherwise `memo` is defeated — a new function every render looks like new props).
3. Pass **primitive** props (`isSelected` boolean), not freshly-created objects.

## Likely follow-ups

1. "Why didn't `memo` alone fix it?" → the inline `onSelect` was a new function each render.
2. "What about `useMemo` for an expensive derived value?" → memoize it so it isn't
   recomputed every keystroke.
3. "When is memo NOT worth it?" → cheap rows / props that change every render anyway.

## What's evaluated

- Knowing `memo` + `useCallback` are a **pair** — one without the other is a trap.
- Understanding referential equality and shallow prop comparison.

Reference: `Solution.jsx`. Self-check: `npx vitest run src/senior/05-memoized-rows`
