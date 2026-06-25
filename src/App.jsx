import { useState } from 'react'
import Counter from './problems/01-counter/Counter.jsx'
import TodoList from './problems/02-todo/TodoList.jsx'
import Tabs from './problems/03-tabs/Tabs.jsx'
import StarRating from './problems/04-star-rating/StarRating.jsx'
import UserList from './problems/05-fetch-users/UserList.jsx'
import SearchBox from './problems/06-debounced-search/SearchBox.jsx'
import Pagination from './problems/07-pagination/Pagination.jsx'
import Accordion from './problems/08-fix-the-bug/Accordion.jsx'
import Modal from './problems/09-modal/Modal.jsx'
import SignupForm from './problems/10-form-validation/SignupForm.jsx'
import Cart from './problems/11-reducer-cart/Cart.jsx'
import Stopwatch from './problems/12-stopwatch/Stopwatch.jsx'
import ThemeToggle, { ThemeProvider } from './problems/13-theme-context/ThemeToggle.jsx'
import Autocomplete from './problems/14-autocomplete/Autocomplete.jsx'
import UseFetchDemo from './problems/15-use-fetch/UseFetchDemo.jsx'
import InfiniteList from './problems/16-infinite-scroll/InfiniteList.jsx'
import ReorderList from './problems/17-drag-reorder/ReorderList.jsx'
import DocsViewer from './DocsViewer.jsx'

const WORDS = ['apple', 'apricot', 'avocado', 'banana', 'blueberry', 'cherry']
const fakeFetchSuggestions = (q) =>
  new Promise((r) => setTimeout(() => r(WORDS.filter((w) => w.startsWith(q.toLowerCase()))), 200))
let page = 0
const fakeLoadMore = () =>
  new Promise((r) =>
    setTimeout(() => {
      page += 1
      r(page > 4 ? [] : Array.from({ length: 5 }, (_, i) => `Row ${(page - 1) * 5 + i + 1}`))
    }, 300),
  )

const PROBLEMS = [
  { id: '01 Counter', el: <Counter /> },
  { id: '02 Todo', el: <TodoList /> },
  { id: '03 Tabs', el: <Tabs tabs={[{ label: 'One', content: 'First' }, { label: 'Two', content: 'Second' }]} /> },
  { id: '04 Star rating', el: <StarRating count={5} /> },
  { id: '05 Fetch users', el: <UserList /> },
  { id: '06 Debounced search', el: <SearchBox /> },
  { id: '07 Pagination', el: <Pagination items={Array.from({ length: 23 }, (_, i) => `Item ${i + 1}`)} pageSize={5} /> },
  { id: '08 Fix the bug (Accordion)', el: <Accordion sections={[{ title: 'A', body: 'aaa' }, { title: 'B', body: 'bbb' }]} /> },
  { id: '09 Modal', el: <Modal>Hello from the modal</Modal> },
  { id: '10 Form validation', el: <SignupForm onSubmit={(v) => alert(JSON.stringify(v))} /> },
  { id: '11 Cart (useReducer)', el: <Cart products={[{ id: 1, name: 'Apple', price: 3 }, { id: 2, name: 'Banana', price: 2 }]} /> },
  { id: '12 Stopwatch', el: <Stopwatch /> },
  { id: '13 Theme (Context)', el: <ThemeProvider><ThemeToggle /></ThemeProvider> },
  { id: '14 Autocomplete', el: <Autocomplete fetchSuggestions={fakeFetchSuggestions} onSelect={(v) => console.log('selected', v)} /> },
  { id: '15 useFetch hook', el: <UseFetchDemo /> },
  { id: '16 Infinite scroll', el: <InfiniteList loadMore={fakeLoadMore} /> },
  { id: '17 Drag reorder', el: <ReorderList initialItems={['Alpha', 'Bravo', 'Charlie', 'Delta']} /> },
]

// Just a manual playground/preview. The real grading is the *.test.jsx files.
export default function App() {
  const [view, setView] = useState('problems') // 'problems' | 'docs'
  const [active, setActive] = useState(0)

  const tabStyle = (on) => ({
    padding: '8px 16px',
    background: on ? '#111' : '#eee',
    color: on ? '#fff' : '#000',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 600,
  })

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 820, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>DynaChrg React Practice</h1>
      <p style={{ color: '#666' }}>
        Run <code>npm test</code> to grade. Use the preview to eyeball your work, or read the docs.
      </p>

      <div style={{ display: 'flex', gap: 8, margin: '1rem 0' }}>
        <button style={tabStyle(view === 'problems')} onClick={() => setView('problems')}>Problems</button>
        <button style={tabStyle(view === 'docs')} onClick={() => setView('docs')}>Docs</button>
      </div>
      <hr />

      {view === 'problems' ? (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '1rem 0' }}>
            {PROBLEMS.map((p, i) => (
              <button key={p.id} onClick={() => setActive(i)}
                style={{ padding: '6px 10px', background: i === active ? '#0b5' : '#eee', color: i === active ? '#fff' : '#000', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                {p.id}
              </button>
            ))}
          </div>
          <div style={{ marginTop: '1rem' }}>{PROBLEMS[active].el}</div>
        </>
      ) : (
        <div style={{ marginTop: '1rem' }}>
          <DocsViewer />
        </div>
      )}
    </div>
  )
}
