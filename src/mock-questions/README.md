# Mock HackerRank Exam (2 questions)

These two questions mimic the **real DynaChrg test format** you saw: one section,
**React (Intermediate)**, **2 "Full Stack (Frontend)" questions**, project-based
with a spec sheet and hidden test cases.

## How to take it (simulate the real thing)

1. Set a timer for **75 minutes** for both questions. Don't pause.
2. Open `q1-shopping-cart/README.md`, read the spec, implement in the stub files.
3. Run its tests as your "Run Tests" button:
   ```bash
   npx vitest run src/mock-questions/q1-shopping-cart
   ```
4. Repeat for `q2-users-directory`.
5. Watch it live if you like: `npm run dev` (these aren't wired into the tab nav;
   the tests are the grader — that's authentic to HackerRank).

## The two questions

| Q | Title | Flavor | Skills |
|---|-------|--------|--------|
| 1 | Shopping Cart | stateful component | lift state up, props, immutable updates, derived totals |
| 2 | Users Directory | data + interaction | fetch, loading/error, live search filter, empty state |

## Rules (same as the real test)

- **Don't rename** files, components, or exports.
- Match the **exact `data-testid`** values in the spec — character for character.
- Partial credit is real: a few passing cases beat a blank submit.
- Read the **whole spec first**, then code.

Solutions: `_solutions/mock-q1-*` and `_solutions/mock-q2-*` (after you try).
