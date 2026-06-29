# Live Coding 3 — Traffic Light  ⏱ 15 min

## Interviewer prompt

> "Build a traffic light that cycles automatically: green for 3s, yellow for 1s,
> red for 2s, then repeats. Show which light is active. Add a pause/resume button."

## Requirements

- Three lights: red, yellow, green. Exactly one is active at a time.
- It auto-advances on the per-color durations above and loops forever.
- The active light is visually distinct and marked `data-testid="active-light"`
  with text of the current color.
- A **Pause / Resume** button stops/starts the cycle.

## Likely follow-ups

1. "Add a manual Next button." → factor the 'advance' into a function both the
   timer and the button call.
2. "Make durations configurable via props."
3. "Why `useEffect` cleanup here?" → clearing the timer prevents overlapping
   timers and double-speed cycling; runs on unmount too.

## What they're evaluating

- A clean **state machine**: current color → next color + its duration.
- Correct `setTimeout`/`setInterval` use **with cleanup** (the classic trap).
- No leaked/stacked timers when toggling pause.

## Hints (only if stuck)

- Model the order: `['green', 'yellow', 'red']` with a duration map.
- `useEffect` keyed on `[current, running]`: if running, `setTimeout` to advance
  to the next color after its duration; return `clearTimeout`.

Reference: `Solution.jsx`.
