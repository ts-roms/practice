# Senior 1 — Build a tree from a flat list  ⏱ 20 min

## Prompt

> "We get categories from the API as a **flat** list where each row has a
> `parentId`. Turn it into a nested tree for rendering. Roots have `parentId:
> null`. Do it in a single pass, not O(n²)."

## Signature

```js
buildTree(flat) // flat: [{ id, parentId, name }]  ->  nested [{ id, name, children: [...] }]
```

- Every node gets a `children` array (empty if it has none).
- A node whose `parentId` is `null` (or has no matching parent) is a root.
- Order within `children` follows input order.

## Why it's a senior question

- The naive approach is O(n²) (scan the list for each node's children). The
  expected solution is **O(n)** using a lookup map of `id → node`.
- Tests your instinct to **index first, then link**.

## Likely follow-ups

1. "Handle orphans / cycles gracefully." → skip unknown parents; don't infinite-loop.
2. "Sort children by a field." → sort each children array, or sort flat first.
3. "Now render it." → recursive component (see live-coding 8).

## Hints

- Pass 1: `const byId = new Map(flat.map(n => [n.id, { id: n.id, name: n.name, children: [] }]))`.
- Pass 2: for each node, push into its parent's `children`, or into `roots`.

Reference: `solution.js`. Self-check: `npx vitest run src/senior/01-build-tree`
