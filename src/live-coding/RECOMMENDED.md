# ⭐ Recommended — what to drill first

Live-coding challenges ranked by how often they (or close variants) show up in
front-end / React interviews. If you're short on time, work top-down.

## 🎯 Top 6 — start here

These give the most coverage because each reappears in disguised forms. If these
six are automatic, you can improvise almost any prompt.

| Order | Challenge | Why it's worth the most |
|-------|-----------|--------------------------|
| 1 | **Live 1 — Tic-Tac-Toe** | the canonical "build a game"; derived state from one source |
| 2 | **Live 2 — Typeahead** | combines async + debounce + keyboard nav in one |
| 3 | **Problem 05 / Mock Q2 — Fetch with loading/error/empty** | the most common *real-work* task |
| 4 | **Live 17 — Like button (optimistic update)** | the pattern that signals a confident React hire |
| 5 | **Live 16 — Dropdown (click-outside)** | refs + document listener **with cleanup** |
| 6 | **Live 15 / Problem 20 — a custom hook** | the "show me reusable logic" ask |

## Tier 1 — almost certainly one of these

- **Live 1** Tic-Tac-Toe · **Live 2** Typeahead · **Problem 02** Todo ·
  **Problem 04** Star rating · **Problem 05** Fetch states

## Tier 2 — very common

- **Live 16** Dropdown · **Live 17** Like/optimistic · **Live 7** Tags input ·
  **Live 19** Inline edit · **Live 18** Multi-select · **Problem 09** Modal ·
  **Problem 10** Form validation · **Live 3 / 20** Traffic light / Countdown ·
  **Live 6** OTP input · **Live 8** Nested comments

## Tier 3 — senior / strong-mid

- **Problem 16** Infinite scroll · **Senior 4** Virtualized list ·
  **Senior 5** Memoized rows · **Live 12** Carousel · **Problem 17** Drag-reorder ·
  **Live 13** Form wizard · **Live 14** Toasts

## Tier 4 — pure-JS (often paired with one React task)

- **Live 4** debounce/throttle · **Mock Q3** EventEmitter ·
  **Live 10** curry/compose/pipe · **Live 11** Promise.all/retry ·
  **Live 5 / Senior 1–3** flatten/groupBy, build-tree, aggregate, data-pipeline

## The meta-pattern (what they're really testing)

~80% of these reduce to four primitives. Master these and the specific prompt
barely matters:

1. **List rendering** — stable keys, immutable updates (`map`/`filter`, never mutate).
2. **Controlled inputs** — `value` + `onChange`, React as the source of truth.
3. **`useEffect` with cleanup** — timers, fetch (cancel flag), event listeners.
4. **Derived state** — compute from existing state; don't duplicate it.

## How to practice (not just *what*)

- Set the timer, **narrate out loud** the whole time — communication is scored as
  much as the code.
- Clarify → plan in one sentence → stub → happy path → test by clicking → edge cases.
- After solving, open **Solution** and diff your approach; note what was cleaner.
