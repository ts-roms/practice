# Live Coding 15 — Custom Hooks  ⏱ 20 min

## Interviewer prompt

> "Write two custom hooks. `useToggle(initial)` returns a boolean and a function
> to flip it. `usePrevious(value)` returns the value from the previous render.
> Explain how each works."

## Requirements

### `useToggle(initial = false)`
- Returns `[value, toggle, setValue]`.
- `toggle()` flips the boolean.
- `toggle(true)` / `setValue(true)` can force a specific value (bonus).

### `usePrevious(value)`
- Returns the value `value` had on the **previous** render.
- On the first render, returns `undefined`.

```js
const [on, toggle] = useToggle()      // on=false; toggle() -> true
const prev = usePrevious(count)       // count was 4, now 5 -> prev === 4
```

## Likely follow-ups

1. "Why does `usePrevious` use a ref, not state?" → updating it must NOT trigger a
   re-render, and the update happens *after* render (in an effect).
2. "When does the ref actually update?" → in a `useEffect`, so during render you
   still see the previous value.
3. "Build `useToggle` with `useReducer`." → reducer flips on no payload.

## What they're evaluating

- Knowing **refs persist across renders without causing re-renders**.
- The render-then-effect timing that makes `usePrevious` work.
- `useCallback` for a stable `toggle` (nice-to-have).

Reference: `solution.js`. Self-check: `npx vitest run src/live-coding/15-custom-hooks`
