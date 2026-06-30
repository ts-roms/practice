# Live Coding 20 — Countdown Timer  ⏱ 15 min

## Interviewer prompt

> "Build a countdown timer that starts from N seconds and ticks down to zero.
> Start, Pause, and Reset buttons. When it reaches 0 it stops and shows 'Done'."

## Requirements

- Show remaining seconds in `data-testid="remaining"` (starts at `initialSeconds`).
- **Start** begins ticking down once per second; **Pause** stops; **Reset** restores
  the initial value and stops.
- At 0 it stops automatically and shows `data-testid="done"` ("Done!").
- Starting again from 0 should do nothing (or require a reset first).

## Likely follow-ups

1. "Let the user enter the duration." → an input feeding `initialSeconds`.
2. "Show mm:ss." → format the seconds.
3. "Why `useEffect` cleanup?" → clear the interval on pause/unmount so timers don't stack.

## What's evaluated

- `setInterval` in `useEffect` keyed on the running flag, **with cleanup**.
- Functional updater (`s => s - 1`) so the tick doesn't read a stale value.
- Stopping cleanly at zero (no negative numbers, no runaway interval).

Reference: `Solution.jsx`.
