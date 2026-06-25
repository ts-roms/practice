// MCQ bank for the DynaChrg Mid-Level React test.
// Each: { q, options: [...], answer: <index>, explain }
export const QUESTIONS = [
  // --- React fundamentals ---
  {
    q: 'What does the dependency array `[]` in useEffect(fn, []) mean?',
    options: ['Run after every render', 'Run once after mount', 'Never run', 'Run only on unmount'],
    answer: 1,
    explain: 'An empty deps array runs the effect once after mount; its cleanup runs on unmount.',
  },
  {
    q: 'Which is the correct way to update count based on its previous value?',
    options: ['setCount(count + 1)', 'setCount(prev => prev + 1)', 'count++', 'count = count + 1'],
    answer: 1,
    explain: 'The functional updater is safe against stale values and React state batching.',
  },
  {
    q: 'Why is using the array index as a list key risky?',
    options: ['It is slower', 'Keys must be numbers', 'On reorder/insert React mis-associates item state', 'It is not risky'],
    answer: 2,
    explain: 'Index keys break item identity when the list reorders/inserts/deletes, causing wrong state/UI.',
  },
  {
    q: 'A controlled input is one where…',
    options: ['The DOM holds the value, read via ref', 'value is bound to state and updated via onChange', 'It has a defaultValue', 'It uses useRef'],
    answer: 1,
    explain: 'Controlled = React state is the source of truth (value + onChange).',
  },
  {
    q: 'What triggers a component re-render?',
    options: ['Editing a ref', 'A state change or new props', 'A console.log', 'Mutating a local variable'],
    answer: 1,
    explain: 'Re-renders come from state updates or new props. Refs do NOT trigger renders.',
  },
  {
    q: 'In JSX, the HTML class attribute is written as…',
    options: ['class', 'className', 'classsName', 'css'],
    answer: 1,
    explain: 'JSX uses className (and htmlFor) because class/for are reserved JS words.',
  },
  {
    q: 'Props inside the child component are…',
    options: ['Mutable', 'Read-only', 'Always strings', 'Global'],
    answer: 1,
    explain: 'Props are read-only in the child; data flows one way (parent → child).',
  },
  {
    q: 'Which removes an item immutably from a state array `items`?',
    options: ['items.splice(i, 1)', 'setItems(items.filter(x => x.id !== id))', 'delete items[i]', 'items.pop()'],
    answer: 1,
    explain: 'filter returns a NEW array; splice/pop/delete mutate the existing one.',
  },
  {
    q: 'What is the Virtual DOM?',
    options: ['A faster real DOM', 'An in-memory tree React diffs to compute minimal DOM updates', 'A browser API', 'A CSS engine'],
    answer: 1,
    explain: 'React diffs the new virtual tree against the old (reconciliation) and patches only differences.',
  },
  {
    q: 'The function returned from a useEffect callback is used for…',
    options: ['Returning JSX', 'Cleanup (unsubscribe / clearTimeout)', 'Memoization', 'Error handling'],
    answer: 1,
    explain: 'It runs before the next effect run and on unmount — undo subscriptions/timers there.',
  },
  // --- Hooks ---
  {
    q: 'Which hook memoizes a FUNCTION reference?',
    options: ['useMemo', 'useRef', 'useCallback', 'useState'],
    answer: 2,
    explain: 'useCallback memoizes a function; useMemo memoizes a computed value.',
  },
  {
    q: 'Which violates the Rules of Hooks?',
    options: ['Calling useState at the top of a component', 'Calling useEffect inside an if block', 'Using a custom hook', 'Calling useState twice'],
    answer: 1,
    explain: 'Hooks must be called at the top level — never conditionally or in loops.',
  },
  {
    q: 'When would you use useReducer over useState?',
    options: ['Never', 'For complex state logic / many related transitions', 'Only for forms', 'To avoid re-renders'],
    answer: 1,
    explain: 'useReducer centralizes complex/branching state updates into a pure reducer.',
  },
  {
    q: 'The Context API primarily solves…',
    options: ['Performance', 'Prop drilling', 'Routing', 'Form validation'],
    answer: 1,
    explain: 'Context supplies values to a subtree without passing props through every layer.',
  },
  {
    q: 'What is a "stale closure" in a useEffect?',
    options: ['A memory leak', 'The effect captures old values because deps were omitted', 'A syntax error', 'An infinite loop'],
    answer: 1,
    explain: 'Omitting a used value from deps makes the effect keep using the value from an earlier render.',
  },
  {
    q: 'useRef is best described as…',
    options: ['A way to trigger re-renders', 'A mutable box that persists across renders without causing re-render', 'A replacement for useState', 'A context provider'],
    answer: 1,
    explain: 'useRef holds a mutable .current that survives renders and does not trigger one when changed.',
  },
  // --- Async / JS ---
  {
    q: 'What does Promise.all([a, b]) do?',
    options: ['Runs sequentially', 'Resolves when all resolve; rejects if any rejects', 'Resolves on first', 'Cancels both'],
    answer: 1,
    explain: 'Promise.all waits for every promise; a single rejection rejects the whole thing.',
  },
  {
    q: 'Which correctly handles a fetch that may fail?',
    options: ['Ignore errors', 'try { await fetch } catch { handle }', 'fetch().then() only', 'Use a for loop'],
    answer: 1,
    explain: 'Wrap await fetch in try/catch and also check res.ok for non-2xx responses.',
  },
  {
    q: 'screen.findByText(...) differs from getByText because it…',
    options: ['Returns an array', 'Is async and waits for the element', 'Never throws', 'Searches by role'],
    answer: 1,
    explain: 'findBy* is async — use it to wait for elements that appear after a fetch/state update.',
  },
  {
    q: 'Which RTL query asserts an element is ABSENT?',
    options: ['getByText', 'queryByText', 'findByText', 'getAllByText'],
    answer: 1,
    explain: 'queryBy* returns null (instead of throwing) when not found, so it can assert absence.',
  },
  // --- Advanced / patterns ---
  {
    q: 'To debounce a value with useEffect + setTimeout, the cleanup should…',
    options: ['Do nothing', 'clearTimeout the pending timer', 'Call the callback again', 'Reset state'],
    answer: 1,
    explain: 'Clearing the timer on each change is what makes only the final value fire once.',
  },
  {
    q: 'IntersectionObserver is commonly used to implement…',
    options: ['Form validation', 'Infinite scroll / lazy loading', 'Global state', 'Routing'],
    answer: 1,
    explain: 'It fires when a sentinel element scrolls into view — trigger loading the next page there.',
  },
  {
    q: 'For HTML5 drag-and-drop reorder, onDragOver must…',
    options: ['Return false', 'Call e.preventDefault() to allow a drop', 'Stop propagation', 'Set state'],
    answer: 1,
    explain: 'Without preventDefault on dragover, the drop event will not fire.',
  },
  {
    q: 'React.memo is used to…',
    options: ['Cache fetch results', 'Skip re-render when props are shallow-equal', 'Memoize values', 'Store refs'],
    answer: 1,
    explain: 'React.memo wraps a component to skip rendering when its props have not changed (shallow compare).',
  },
  {
    q: 'A good reason to extract logic into a custom hook is…',
    options: ['To make it run faster', 'To reuse stateful logic across components', 'To avoid using state', 'To replace Redux'],
    answer: 1,
    explain: 'Custom hooks (useFetch, useDebounce, useLocalStorage…) share stateful logic, not markup.',
  },
]
