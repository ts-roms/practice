import { useFetch } from './useFetch.js'

// Small demo so the problem shows up in the live preview (npm run dev).
// The graded unit is the useFetch hook itself (see useFetch.test.jsx).
export default function UseFetchDemo() {
  const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/users/1')

  return (
    <div>
      <button onClick={refetch}>Refetch</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {String(error.message || error)}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
