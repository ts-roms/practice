# Live Coding — Mini Course

A **live coding challenge** is different from the HackerRank test: an interviewer
watches you build something from a spoken prompt, screen-shared, while you **talk
through your thinking**. There are usually no hidden tests — *you* are being
evaluated as much as the code. DynaChrg-style interviews use these to see how you
reason, communicate, and handle changing requirements.

This module has 15 timed challenges with interviewer prompts, follow-ups, and
reference solutions.

## The 6-step approach (say these out loud)

1. **Clarify** — restate the problem, ask 1–2 questions ("Should it support X?").
   Confirming scope is a green flag; diving in silently is a red flag.
2. **Plan** — describe your approach in one sentence before typing ("I'll hold
   the board in a 9-cell array and compute the winner from it").
3. **Stub the UI / signature** — get *something* rendering or returning fast.
4. **Implement the happy path** — make the core case work end to end.
5. **Test as you go** — click through it / call it with an example; narrate what
   you expect vs. see.
6. **Edge cases & follow-ups** — handle empties, draws, resets; then take the
   interviewer's extensions.

## What they're scoring

- **Communication** — do you think out loud and explain trade-offs?
- **Correctness** — does the happy path actually work?
- **React fundamentals** — immutable state, keys, effects/cleanup, derived state.
- **Composure** — when stuck, do you reason calmly or freeze? Saying "let me
  reconsider" is fine.
- **Adaptability** — can you extend the solution when they change requirements?

## Red flags to avoid

- Coding in silence. / Mutating state directly. / Copy-pasting without explaining.
- Over-engineering early (no Redux for a tic-tac-toe). Start simple.
- Not running/clicking your code before declaring it done.

## The challenges

| # | Challenge | Time | Type | Drills |
|---|-----------|------|------|--------|
| 1 | Tic-Tac-Toe | 25 min | React | derived winner, immutable board, reset |
| 2 | Typeahead / Autocomplete | 25 min | React | filtering, keyboard nav, controlled input |
| 3 | Traffic Light | 15 min | React | state machine, intervals + cleanup |
| 4 | debounce & throttle | 20 min | JS | closures, timers, higher-order functions |
| 5 | Array utilities (flatten, groupBy) | 15 min | JS | recursion, reduce, edge cases |
| 6 | OTP Input | 20 min | React | refs + imperative focus, array state |
| 7 | Tags / Chips Input | 20 min | React | dedupe, Enter/Backspace keyboard handling |
| 8 | Nested Comments | 20 min | React | recursive component, tree data, per-node state |
| 9 | Calculator | 25 min | React | state machine, chaining, edge cases |
| 10 | curry / compose / pipe | 20 min | JS | closures, recursion, reduce/reduceRight |
| 11 | Promise utilities (promiseAll, retry) | 25 min | JS | Promise constructor, ordering, async retry |
| 12 | Image Carousel | 20 min | React | wrap-around index, autoplay interval + cleanup |
| 13 | Multi-step Form Wizard | 25 min | React | shared form state, per-step validation, navigation |
| 14 | Toast Notifications | 20 min | React | id'd list, per-toast auto-dismiss timers (no leaks) |
| 15 | Custom Hooks (useToggle, usePrevious) | 20 min | React | refs across renders, render-then-effect timing |

Open each `CHALLENGE.md`, start a timer, build in `Starter.*`, then compare with
`Solution.*`. Or read the prompts in the app's **Live Coding** tab (`npm run dev`).
