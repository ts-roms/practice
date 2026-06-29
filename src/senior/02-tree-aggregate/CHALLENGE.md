# Senior 2 — Aggregate over a tree  ⏱ 20 min

## Prompt

> "Given a file-system tree — folders have `children`, files have a `size` —
> compute the total size of any node, and a count of files under it. A folder's
> size is the sum of everything beneath it, at any depth."

## Signatures

```js
totalSize(node)   // number — sum of all file sizes in the subtree
countFiles(node)  // number — how many files (leaves) are in the subtree
```

Node shapes:
```js
{ name: 'file.txt', size: 100 }                       // file (leaf)
{ name: 'folder', children: [ ...nodes ] }            // folder
```

## Why it's a senior question

- Clean **recursion with a base case** (leaf) and a reduce over children.
- Comes up constantly: folder sizes, comment counts, org-chart headcounts,
  category totals, nested cart subtotals.

## Likely follow-ups

1. "Return a new tree annotated with each folder's `totalSize`." → map recursively.
2. "Find the largest file." → recursive max.
3. "Do it iteratively (stack/queue)." → DFS with an explicit stack.
4. "Memoize for repeated queries." → cache by node reference.

## What's evaluated

- Correct base case (leaf returns its own size / counts as 1).
- `reduce` over `children` for the recursive case.
- Handling missing `children` / `size` defensively.

Reference: `solution.js`. Self-check: `npx vitest run src/senior/02-tree-aggregate`
