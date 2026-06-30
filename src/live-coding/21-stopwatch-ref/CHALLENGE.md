# Live Coding 21 — Stopwatch with useRef  ⏱ 20 min

## Interviewer prompt

> "Build a stopwatch: Start, Stop, Reset, and Lap. Store the interval id in a
> **ref**, not in state — and explain why. It should count up in seconds, and Lap
> should record the current time into a list."

## Requirements

- Show elapsed seconds in `data-testid="time"` (starts at 0).
- **Start** begins counting up once per second; **Stop** pauses; **Reset** zeroes
  the time and clears laps.
- Store the `setInterval` id in a `useRef` and clear it imperatively in Stop/Reset.
- Clicking **Start** twice must NOT double-count (guard on the ref).
- **Lap** appends the current time to a list (`data-testid="lap-{i}"`).
- Clear the interval on unmount (no leak).

## Why a ref (say this)

- The interval id is a **mutable value that shouldn't trigger a re-render** when it
  changes — that's exactly what `useRef` is for. Putting it in `useState` would be
  wrong (causes renders) and reading it back would be stale.
- The ref also **persists across renders**, so Stop can reach the id Start created.

## Likely follow-ups

1. "Show centiseconds / mm:ss.cs." → tick every 10ms, format the output.
2. "Why not `useEffect` like the other timer?" → both work; the ref approach is the
   imperative style — but you still need unmount cleanup.
3. "What breaks if you store the id in state?" → extra renders + stale reads in handlers.

## What's evaluated

- `useRef` for the timer id + the **double-start guard**.
- Imperative `clearInterval` in Stop/Reset and on unmount.
- Functional updater (`s => s + 1`) so ticks don't read stale state.

Reference: `Solution.jsx`. Self-check: `npx vitest run src/live-coding/21-stopwatch-ref`
