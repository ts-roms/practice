# DynaChrg Front-End (Mid-Level React) — Prep Kit

Everything to prepare for the HackerRank **DynaChrg Front-End Developer (Mid-Level)
React Test**. You have 7 days — here's a plan.

> You're inside the React project. The theory pack (`.docx`) lives one level up
> in the repo root.

## What's in this folder

| File / folder | What it is |
|---|---|
| `src/problems/` | **Runnable** HackerRank-style coding tests (Vite + Vitest + RTL). 17 problems, make the tests pass. This is the most important part. |
| `STUDY_GUIDE.md` | Concept cheat-sheet — hooks, core concepts, JS, gotchas, RTL queries. |
| `MOCK_TEST.md` | Timed mock paper: 15 MCQs + 4 coding tasks + verbal Qs, with full answer key. |
| `_solutions/` | Verified reference solutions (peek only after trying). |
| `../FrontEnd_React_Interview_Pack.docx` | Theory question bank (70% theory / 30% practical) with model answers. |

## Quick start

```bash
# from this folder (practice/)
npm install
npm run test:watch
```

Then open [src/problems/01-counter/Counter.jsx](src/problems/01-counter/Counter.jsx) and start making tests green.

## A 7-day plan

- **Day 1** — Read `STUDY_GUIDE.md`. Skim the `../*.docx` theory pack. Do problems 01–03.
- **Day 2** — Problems 04–05 (star rating, fetch states). Re-read the `useEffect` section.
- **Day 3** — Problems 06–08 (debounce, pagination, fix-the-bug). These are the differentiators.
- **Day 4** — Problems 09–13 (modal, form validation, useReducer, stopwatch, context).
- **Day 5** — Advanced 14–17 (autocomplete, useFetch, infinite scroll, drag-reorder). Stretch goals.
- **Day 6** — Take `MOCK_TEST.md` timed (75 min), cold. Grade yourself. Review weak spots.
- **Day 7** — Redo any problem from a blank file in <15 min each. Skim theory once more.

## What the real test likely looks like

- In-browser HackerRank IDE, ~60–90 min, a few MCQs + 1–3 React coding tasks.
- Coding tasks ship with **pre-written tests** (Jest/RTL) and `data-testid`s — you
  make them pass. **Read the tests first.** Don't rename testids or the export.
- Common topics: controlled inputs, list add/toggle/delete/filter, fetch with
  loading/error states, tabs/accordion/modal, debounced search, fix-the-bug.

Good luck — the single best prep is doing the problems until they're muscle memory.
