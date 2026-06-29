# Senior Frontend — List Computation & Rendering

Senior-level challenges focused on the two things that separate mid from senior on
front-end work with lists: **computing derived data correctly** and **rendering
large/often-changing lists performantly**.

Unlike the live-coding warm-ups, every one of these has tests — treat them as
take-home-quality problems and make the tests pass.

## The challenges

| # | Challenge | Type | The senior insight |
|---|-----------|------|--------------------|
| 1 | Build a tree from a flat list | JS | index-then-link in **O(n)**, not O(n²) |
| 2 | Aggregate over a tree | JS | recursion with a base case; folder = sum of subtree |
| 3 | Data pipeline (filter→sort→paginate) | JS | a **pure selector**; order of ops; immutability |
| 4 | Virtualized list (windowing) | React | keep DOM ~constant for 10k rows |
| 5 | Stop the list re-rendering | React | `memo` + `useCallback` are a **pair** |

## Run

```bash
npx vitest run src/senior            # all senior challenges
npx vitest run src/senior/04-virtualized-list
```

Reference solutions live next to each `Starter`/`starter.js`. Also browsable in the
app's **Senior** tab (`npm run dev`).

## The themes interviewers probe

- **"Compute the list" separate from "render the list."** Pure functions
  (challenges 1–3) that you can test and wrap in `useMemo`. Keeping derivation out
  of the component is the senior habit.
- **Referential stability.** Why a new inline function/object each render defeats
  `React.memo` (challenge 5). This is the most common senior React gotcha.
- **Big-O awareness in the UI.** O(n²) tree building or re-rendering 10k rows is
  what makes "it gets slow with real data" bugs (challenges 1, 4).
