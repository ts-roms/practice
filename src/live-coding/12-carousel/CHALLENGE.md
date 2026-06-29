# Live Coding 12 — Image Carousel  ⏱ 20 min

## Interviewer prompt

> "Build an image carousel. Show one slide at a time with Prev/Next buttons that
> wrap around. Add dot indicators showing the current slide, and an autoplay
> toggle that advances every 2 seconds."

## Requirements

- Show the current slide (`data-testid="current-slide"`).
- **Prev** / **Next** buttons cycle through slides and **wrap** (last → first).
- Dot indicators, one per slide (`data-testid="dot-{i}"`); the active dot is
  marked (e.g. `aria-current="true"`). Clicking a dot jumps to that slide.
- An autoplay **Play/Pause** button; while playing, advance every 2s.

## Likely follow-ups

1. "Pause autoplay on hover." → `onMouseEnter/Leave`.
2. "Add swipe / keyboard arrows." → key handlers / touch events.
3. "Why does autoplay need `useEffect` cleanup?" → clear the interval so toggling
   play/pause or unmounting doesn't stack intervals.

## What they're evaluating

- Index state with **modulo wrap-around** math.
- `setInterval` inside `useEffect` **with cleanup**, keyed on the playing flag.
- Using a functional state updater inside the interval (no stale index).

## Hints (only if stuck)

- `next = () => setIndex(i => (i + 1) % images.length)`.
- `useEffect(() => { if (!playing) return; const id = setInterval(next, 2000); return () => clearInterval(id) }, [playing])`.

Reference: `Solution.jsx`.
