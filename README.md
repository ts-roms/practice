# DynaChrg React Practice (HackerRank-style)

A test-driven practice kit that mimics the real HackerRank flow: you get a stubbed
component + a hidden-style test suite, and your job is to make the tests pass.

## Setup (one time)

```bash
cd practice
npm install
```

## How to practice

```bash
npm run test:watch     # re-runs tests as you edit  (recommended)
npm test               # one-off full run (what "Submit" does on HackerRank)
npm run dev            # live preview in the browser to eyeball your work
```

Open a problem under `src/problems/<NN>-<name>/`, read the doc comment + the
`*.test.jsx` file, and fill in the component until its tests go green.

> **Pro tip — this is exactly the real exam skill:** read the test file FIRST.
> It tells you the required `data-testid`s, button labels, and exact text. Don't
> rename them.

## Run a single problem's tests

```bash
npx vitest run src/problems/02-todo
```

## The 20 problems (01–13 core, 14–20 advanced)

| #  | Problem            | What it drills                                        |
|----|--------------------|------------------------------------------------------|
| 01 | Counter            | `useState`, functional updates, clamping             |
| 02 | Todo list          | controlled input, immutable array updates, filtering |
| 03 | Tabs               | active index, `aria-selected`, conditional render    |
| 04 | Star rating        | hover vs committed state, `Array.from`, callbacks    |
| 05 | Fetch users        | `useEffect` fetch + loading / error / empty states   |
| 06 | Debounced search   | `setTimeout` debounce + `useEffect` cleanup          |
| 07 | Pagination         | slicing, derived state, disabled buttons             |
| 08 | Fix the bug        | reading broken code: state shape, keys, immutability |
| 09 | Modal              | Escape key + click-outside, effect cleanup, `stopPropagation` |
| 10 | Form validation    | controlled form, error messages, disabled submit, touched state |
| 11 | Cart (useReducer)  | `useReducer`, add/inc/dec/remove, derived total      |
| 12 | Stopwatch          | `setInterval` + cleanup, start/stop/reset            |
| 13 | Theme toggle       | Context API: `createContext` / Provider / `useContext` |
| 14 | Autocomplete       | **[adv]** debounced async + ArrowUp/Down/Enter/Escape keyboard nav |
| 15 | `useFetch` hook    | **[adv]** custom hook, `renderHook`, loading/error/refetch |
| 16 | Infinite scroll    | **[adv]** IntersectionObserver, append batches, load guard |
| 17 | Drag-to-reorder    | **[adv]** HTML5 drag events, immutable splice reorder |
| 18 | Sortable table     | **[adv]** click-to-sort asc/desc, `aria-sort`, numeric vs string |
| 19 | `useLocalStorage`  | **[adv]** custom hook, lazy init, persist + functional updater |
| 20 | `useDebounce`      | **[adv]** custom hook, `setTimeout` + cleanup, timer reset |

## Stuck?

Reference solutions are in `_solutions/` (all verified to pass). Try not to peek
until you've spent real effort — the struggle is the practice. After solving,
diff your version against the solution to compare approaches.

See also:
- [START_HERE.md](START_HERE.md) — 7-day plan + what the real test looks like
- [STUDY_GUIDE.md](STUDY_GUIDE.md) — concept cheat-sheet (hooks, gotchas, patterns)
- [MOCK_TEST.md](MOCK_TEST.md) — a timed mock paper (MCQs + coding prompts) with full answers
