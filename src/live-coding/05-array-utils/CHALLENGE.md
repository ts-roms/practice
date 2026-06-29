# Live Coding 5 — Array utilities  ⏱ 15 min

## Interviewer prompt

> "Implement two helpers in plain JS: `flatten(arr)` that deeply flattens a
> nested array to any depth, and `groupBy(arr, keyFn)` that buckets items by a
> key. Don't use `Array.prototype.flat`."

## Requirements

```js
flatten([1, [2, [3, [4]], 5]])           // => [1, 2, 3, 4, 5]
flatten([])                               // => []

groupBy([6.1, 4.2, 6.3], Math.floor)      // => { 6: [6.1, 6.3], 4: [4.2] }
groupBy(['one', 'two', 'three'], w => w.length)
//                                        // => { 3: ['one', 'two'], 5: ['three'] }
```

- `flatten` handles arbitrary nesting depth (recursion or a stack).
- `groupBy` returns a plain object; keys come from `keyFn(item)`.

## Likely follow-ups

1. "Do `flatten` iteratively (no recursion)." → use a stack.
2. "Add a `depth` parameter like the real `flat`." → decrement depth per level.
3. "Big-O?" → flatten is O(n) in total elements; groupBy O(n).

## What they're evaluating

- Comfort with recursion **and** `reduce`.
- Edge cases: empty arrays, single level, deeply nested.
- Clean, readable code with a clear base case.

Reference: `solution.js`. Self-check: `npx vitest run src/live-coding/05-array-utils`
