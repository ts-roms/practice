# React Mid-Level — Study Guide / Cheat-Sheet

Fast reference for the DynaChrg HackerRank test. Pairs with the runnable problems
in `src/problems/` and the theory bank in `../FrontEnd_React_Interview_Pack.docx`.

---

## 1. Hooks you must know cold

### `useState`
```jsx
const [count, setCount] = useState(0)
setCount(5)                 // replace
setCount(c => c + 1)        // functional update — USE THIS when next value depends on prev
```
- State updates are **asynchronous & batched**. Don't read `count` right after `setCount`.
- Never mutate state. Arrays/objects → always create a new reference:
  ```jsx
  setItems(prev => [...prev, newItem])              // add
  setItems(prev => prev.filter(i => i.id !== id))   // remove
  setItems(prev => prev.map(i => i.id === id ? {...i, done: !i.done} : i)) // update
  ```

### `useEffect`
```jsx
useEffect(() => {
  // side effect: fetch, subscription, timer
  return () => { /* cleanup: clearTimeout, unsubscribe, abort */ }
}, [dep1, dep2])   // runs after render when a dep changed
```
- `[]` → run **once** on mount (+ cleanup on unmount).
- **no array** → run after **every** render (rarely what you want).
- Cleanup runs before the next effect run AND on unmount.
- Common gotcha: stale closure — list every value you use inside in the deps array.

### `useRef`
- Mutable box that **persists across renders** and **does NOT trigger re-render**.
- Two uses: (1) DOM node `ref={myRef}` → `myRef.current`; (2) hold a mutable value (timer id, previous value).

### `useMemo` / `useCallback`
```jsx
const sorted = useMemo(() => expensiveSort(list), [list])   // memoize a VALUE
const onClick = useCallback(() => doThing(id), [id])        // memoize a FUNCTION ref
```
- Only reach for these for real perf wins or to keep a stable reference for a `memo`'d child / an effect dep. Don't sprinkle everywhere.

### `useReducer`
```jsx
const [state, dispatch] = useReducer(reducer, initialState)
// reducer(state, action) => newState   (pure!)
dispatch({ type: 'increment' })
```
Use when state logic is complex or the next state depends on the previous in branching ways.

### `useContext`
```jsx
const theme = useContext(ThemeContext)  // reads nearest <ThemeContext.Provider value=...>
```
Solves **prop drilling** for global-ish data (theme, auth, locale).

### Rules of Hooks
1. Only call hooks at the **top level** — never inside loops, conditions, or nested functions.
2. Only call hooks from **React function components** or **custom hooks**.

---

## 2. Core concepts (likely MCQ targets)

| Concept | One-liner |
|--------|-----------|
| **Virtual DOM** | In-memory tree; React diffs (reconciles) and patches only what changed. |
| **Reconciliation** | The diffing algorithm; `key` gives list items stable identity. |
| **Keys** | Stable unique id per list item. **Never use array index** if the list can reorder/insert/delete. |
| **Props vs State** | Props: passed in, read-only. State: internal, mutable via setter, triggers re-render. |
| **Controlled input** | `value` + `onChange` driven by state (React = source of truth). |
| **Uncontrolled input** | DOM holds value; read via `ref`. |
| **Lifting state up** | Move shared state to closest common ancestor. |
| **Prop drilling** | Passing props through layers that don't use them → fix with Context. |
| **Pure component / `React.memo`** | Skips re-render if props are shallow-equal. |
| **Fragment** | `<>...</>` groups children without an extra DOM node. |
| **Synthetic event** | React's cross-browser event wrapper (e.g. `onClick`). |
| **Lazy / Suspense** | `React.lazy(() => import(...))` + `<Suspense fallback>` for code-splitting. |

---

## 3. JavaScript essentials they test

```js
// Array methods (know cold)
arr.map(x => x * 2)
arr.filter(x => x > 2)
arr.reduce((acc, x) => acc + x, 0)
arr.find(x => x.id === 3)
arr.some(...) / arr.every(...)

// Destructuring + spread
const { a, b = 10 } = obj
const [first, ...rest] = list
const merged = { ...base, override: 1 }

// Async
async function f() {
  try { const r = await fetch(url); const data = await r.json() }
  catch (e) { /* handle */ }
}
Promise.all([p1, p2])     // wait for all
```
- **Closures**: an inner function "remembers" variables from its outer scope.
- **`==` vs `===`**: always use `===` (no type coercion).
- **`let`/`const` vs `var`**: block-scoped; prefer `const`.
- **Optional chaining / nullish**: `user?.name`, `value ?? 'default'`.

---

## 4. The test-driven exam playbook

1. **Read the test file first.** Note exact `data-testid`s, `getByRole`/`getByText`
   strings, and button labels. Match them exactly.
2. **Make it compile, then make it pass** — start with the simplest render.
3. **Handle the edge branches** graders love: empty list, loading, error, disabled
   button at boundaries, whitespace input.
4. **Immutability**: never mutate state arrays/objects.
5. **Don't over-engineer**: no Redux/extra libs unless asked. Vanilla hooks pass.
6. **Watch the keys** warning in console — fix it; some tests check render identity.
7. **Submit early, refine** — a partial pass beats a blank.

### React Testing Library queries you'll see
```js
screen.getByText('Save')               // throws if not found
screen.queryByText('x')                // null if not found (assert absence)
screen.findByText('x')                 // async, waits (use for fetch results)
screen.getByRole('button', { name: /save/i })
screen.getByPlaceholderText('Search')
screen.getByTestId('count')
within(item).getByRole('checkbox')     // scope a query to a subtree
```
- `userEvent.click/type` are **async** → `await` them.
- Use `findBy*` to wait for async UI (after `fetch`).

---

## 5. Quick gotchas that cost points

- Forgetting the dependency array → effect runs every render → infinite loops with `setState` inside.
- Mutating state directly (`todos.push(x)`) → UI doesn't update.
- Using index as `key` in a reorderable list → wrong item state.
- Reading state right after setting it (it's stale until re-render).
- Not clearing timers/subscriptions in effect cleanup → leaks / double fires.
- Calling `onChange` handler `onChange={handler()}` (called immediately) instead of `onChange={handler}` / `onChange={() => handler()}`.
- Controlled input without `onChange` → React warns and input is read-only.
