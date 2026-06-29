# Senior 3 — Data pipeline (filter → sort → paginate)  ⏱ 25 min

## Prompt

> "A data grid needs to take raw rows plus the user's controls (search text, sort
> column + direction, page) and produce the slice to render. Write that as a
> single **pure** function so it's easy to test and memoize. Order matters:
> filter, then sort, then paginate."

## Signature

```js
getView(rows, {
  query = '',        // case-insensitive substring match across all field values
  sortKey = null,    // field to sort by
  sortDir = 'asc',   // 'asc' | 'desc'
  page = 1,          // 1-based
  pageSize = 10,
}) // => { rows: <pageSlice>, total, totalPages, page }
```

- `total` / `totalPages` reflect the **filtered** set (before pagination).
- Numbers sort numerically; strings alphabetically.
- Must not mutate the input array.

## Why it's a senior question

- **Order of operations** matters (paginating before filtering is a classic bug).
- A pure selector like this is what you'd wrap in `useMemo` and reuse across the
  grid — separating *computing the list* from *rendering* it.
- Tests immutability discipline (`[...rows].sort()`, never `rows.sort()`).

## Likely follow-ups

1. "Add multi-key sort." → array of `{ key, dir }`, compare in order.
2. "Add grouping." → reduce into buckets after sorting.
3. "Memoize it in React." → `useMemo(() => getView(rows, opts), [rows, ...opts])`.
4. "Search only specific columns." → accept a `searchKeys` option.

Reference: `solution.js`. Self-check: `npx vitest run src/senior/03-data-pipeline`
