# Mock Test — DynaChrg React (Mid-Level)

A realistic, timed self-test. **Suggested: 75 minutes.** Cover the answers, do it
cold, then grade. Coding prompts map to the runnable problems in `src/problems/`.

---

## Section A — Multiple choice (20 min, 15 Q)

> Answers + explanations are at the bottom. Don't peek.

**1.** What does the dependency array `[]` in `useEffect(fn, [])` mean?
- A) Run after every render  B) Run once after mount  C) Never run  D) Run only on unmount

**2.** Which is the correct way to update count based on its previous value?
- A) `setCount(count + 1)`  B) `setCount(prev => prev + 1)`  C) `count++`  D) `count = count + 1`

**3.** Why is using the array index as a `key` risky?
- A) It's slower  B) Keys must be numbers  C) On reorder/insert React mis-associates item state  D) It's not risky

**4.** A controlled input is one where…
- A) The DOM holds the value, read via ref
- B) `value` is bound to state and updated via `onChange`
- C) It has a `defaultValue`
- D) It uses `useRef`

**5.** Which hook memoizes a **function reference**?
- A) `useMemo`  B) `useRef`  C) `useCallback`  D) `useState`

**6.** What triggers a component re-render? (best answer)
- A) Editing a `ref`  B) A state change or new props  C) A `console.log`  D) Mutating a local variable

**7.** `useEffect`'s returned function is used for…
- A) Returning JSX  B) Cleanup (unsubscribe/clearTimeout)  C) Memoization  D) Error handling

**8.** Which violates the Rules of Hooks?
- A) Calling `useState` at the top of a component
- B) Calling `useEffect` inside an `if` block
- C) Using a custom hook
- D) Calling `useState` twice in one component

**9.** What does `Promise.all([a, b])` do?
- A) Runs sequentially  B) Resolves when all resolve (rejects if any reject)  C) Resolves on first  D) Cancels both

**10.** In JSX, the class attribute is written as…
- A) `class`  B) `className`  C) `classsName`  D) `css`

**11.** Props are…
- A) Mutable inside the child  B) Read-only inside the child  C) Always strings  D) Global

**12.** Which correctly removes an item immutably from state array `items`?
- A) `items.splice(i, 1)`  B) `setItems(items.filter(x => x.id !== id))`  C) `delete items[i]`  D) `items.pop()`

**13.** What is `React.memo` for?
- A) Caching fetch results  B) Skipping re-render when props are shallow-equal  C) Memoizing values  D) Storing refs

**14.** Context API primarily solves…
- A) Performance  B) Prop drilling  C) Routing  D) Form validation

**15.** `screen.findByText(...)` differs from `getByText` because it…
- A) Returns an array  B) Is async and waits for the element  C) Never throws  D) Searches by role

> 💡 For more MCQs with instant feedback, open the **Quiz (MCQ)** tab in the app
> (`npm run dev`) — 25 questions covering fundamentals + the advanced patterns.

---

## Section A2 — Advanced MCQ (10 min, 8 Q)

**16.** To debounce a value with `useEffect` + `setTimeout`, the cleanup must…
- A) Do nothing  B) `clearTimeout` the pending timer  C) Re-run the callback  D) Reset state

**17.** `IntersectionObserver` is commonly used to implement…
- A) Form validation  B) Infinite scroll / lazy loading  C) Global state  D) Routing

**18.** For HTML5 drag-and-drop, the drop event won't fire unless `onDragOver`…
- A) Returns false  B) Calls `e.preventDefault()`  C) Stops propagation  D) Sets state

**19.** `useCallback(fn, deps)` is equivalent to…
- A) `useMemo(fn, deps)`  B) `useMemo(() => fn, deps)`  C) `useRef(fn)`  D) `useEffect(fn, deps)`

**20.** A good reason to extract a custom hook is to…
- A) Run faster  B) Reuse stateful logic across components  C) Avoid state  D) Replace Redux

**21.** When fetching in an effect, why use a cancel flag / `AbortController` in cleanup?
- A) Speed  B) Avoid setting state after unmount  C) Caching  D) Retry logic

**22.** Which correctly reads an existing value in `useLocalStorage(key, init)`?
- A) Always return `init`  B) `JSON.parse(localStorage.getItem(key))` if present, else `init`  C) `localStorage[key]` directly  D) Use a ref

**23.** A sortable table that toggles asc/desc on repeated header clicks should track…
- A) Only the rows  B) The active sort key AND direction  C) Nothing  D) The DOM order

---

## Section B — Coding (45 min)

Do these in this repo (`npm run test:watch`). They are the real tasks.

- **B1 (10 min):** Todo list — add (trim, ignore empty), toggle, delete, filter
  All/Active/Completed, remaining count. → `src/problems/02-todo`
- **B2 (12 min):** Fetch users with loading / error / empty / list states.
  → `src/problems/05-fetch-users`
- **B3 (12 min):** Debounced search — fire `onSearch` 300ms after typing stops,
  with effect cleanup. → `src/problems/06-debounced-search`
- **B4 (11 min):** Fix-the-bug Accordion — allow multiple open, correct keys,
  immutable toggle. → `src/problems/08-fix-the-bug`

**Grading:** `npm test` — all green = full marks. Partial green = partial credit
(just like HackerRank's per-test-case scoring).

---

## Section C — Short answer / verbal (10 min)

Write 2–3 sentences each (these are typical follow-up interview questions):

1. Explain the Virtual DOM and reconciliation.
2. Difference between `useMemo` and `useCallback` — when would you actually use each?
3. What is a stale closure in a `useEffect`, and how do you fix it?
4. Controlled vs uncontrolled components — which do you prefer and why?
5. How would you fetch data and handle loading + error states in a function component?

---

## Answer key — Section A

1. **B** — `[]` runs the effect once after mount (cleanup on unmount).
2. **B** — functional update is safe against batching/stale values.
3. **C** — index keys break item identity on reorder/insert/delete.
4. **B** — controlled = state-driven `value` + `onChange`.
5. **C** — `useCallback` memoizes a function; `useMemo` memoizes a value.
6. **B** — re-render comes from state change or new props (refs don't).
7. **B** — the returned function is cleanup.
8. **B** — hooks can't be called conditionally; must be top-level.
9. **B** — resolves when all resolve; rejects if any rejects.
10. **B** — `className`.
11. **B** — props are read-only in the child.
12. **B** — `filter` returns a new array (immutable).
13. **B** — skip re-render when props are shallow-equal.
14. **B** — Context solves prop drilling.
15. **B** — `findBy*` is async and waits (use after fetch).

**Scoring (A):** 13–15 = strong · 10–12 = solid mid · <10 = review the STUDY_GUIDE.

## Answer key — Section A2 (advanced)

16. **B** — clearing the timer on each change is what makes only the final value fire.
17. **B** — observe a sentinel element; load more when it scrolls into view.
18. **B** — without `preventDefault` on dragover, no drop event fires.
19. **B** — `useCallback(fn, d)` ≡ `useMemo(() => fn, d)` (memoizes the function ref).
20. **B** — custom hooks share stateful logic, not markup.
21. **B** — ignore a resolved request after the component unmounts (no state-after-unmount).
22. **B** — parse stored JSON if present, otherwise fall back to the initial value.
23. **B** — you need both the key and the direction to toggle and render `aria-sort`.

---

## Answer key — Section B (coding)

Reference solutions are in [`_solutions/`](_solutions/) (all verified to pass).
Try the problem first, then compare. Key points each grader checks:

- **B1 Todo** ([`_solutions/02-TodoList.jsx`](_solutions/02-TodoList.jsx)) —
  trim + ignore empty on add; **immutable** updates (`map`/`filter`, never
  `push`/mutate); a stable `id` for the `key`; filter derives the visible list;
  remaining = count of `!completed`.
- **B2 Fetch** ([`_solutions/05-UserList.jsx`](_solutions/05-UserList.jsx)) —
  a single `status` ('loading' | 'success' | 'error') so only one branch shows;
  `throw` on `!res.ok`; `catch` → error; empty array → empty state; cancel flag
  in the effect cleanup to avoid setting state after unmount.
- **B3 Debounce** ([`_solutions/06-SearchBox.jsx`](_solutions/06-SearchBox.jsx)) —
  `useEffect` on `[query]` that `setTimeout`s the `onSearch` call and **returns a
  cleanup** that `clearTimeout`s it. The cleanup is what makes typing again reset
  the timer so it fires only once.
- **B4 Accordion** ([`_solutions/08-Accordion.jsx`](_solutions/08-Accordion.jsx)) —
  3 bugs: (1) single `openIndex` → a `Set` of open ids so multiple open at once;
  (2) `key={i}` → a stable key (the title/id); (3) toggle must return a **new**
  `Set` (copy then add/delete), not mutate the existing one.

---

## Answer key — Section C (verbal)

1. **Virtual DOM & reconciliation.** The Virtual DOM is a lightweight in-memory
   tree of React elements. On a state/prop change React builds a new tree and
   **diffs** it against the previous one (reconciliation), then applies only the
   minimal real-DOM changes. `key`s give list items stable identity so the diff
   can match them across renders instead of re-creating nodes.

2. **`useMemo` vs `useCallback`.** `useMemo(fn, deps)` memoizes a **value** (the
   result of `fn`); `useCallback(fn, deps)` memoizes a **function reference**
   (`useCallback(fn, d)` ≡ `useMemo(() => fn, d)`). Reach for them to skip an
   expensive recompute, or to keep a stable reference for a `React.memo`'d child
   or an effect dependency — not by default (the bookkeeping has its own cost).

3. **Stale closure in `useEffect`.** An effect captures the variables from the
   render it ran in. If you omit a value from the deps array, the effect keeps
   using the **old** captured value on later renders — e.g. an interval that
   always sees the initial `count`. Fix it by listing every used value in the
   deps array, or use a functional updater (`setCount(c => c + 1)`) / a ref so you
   don't need to close over the latest value.

4. **Controlled vs uncontrolled.** Controlled: the input's `value` is bound to
   React state and updated via `onChange` (React is the source of truth).
   Uncontrolled: the DOM holds the value and you read it via a `ref`. Prefer
   **controlled** for validation, conditional disabling, and dynamic behavior;
   uncontrolled is fine for simple/one-shot fields or integrating non-React code.

5. **Fetch with loading/error states.** In a `useEffect` (deps `[]` for mount, or
   `[url]`), set `loading` true, `await fetch`, `throw` on `!res.ok`, parse JSON
   on success, and `catch` to set an error. Track a single status enum so exactly
   one of loading / error / empty / data renders, and use a cancel flag (or
   `AbortController`) in the cleanup to ignore a resolved request after unmount.
   In real apps this is exactly what a `useFetch` hook or React Query wraps.
