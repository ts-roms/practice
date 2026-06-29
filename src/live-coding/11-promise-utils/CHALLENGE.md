# Live Coding 11 — Promise utilities  ⏱ 25 min

## Interviewer prompt

> "Implement `promiseAll(promises)` from scratch (don't use `Promise.all`) and a
> `retry(fn, attempts)` that retries a promise-returning function."

## Requirements

### `promiseAll(promises)`
- Returns a promise that resolves to an array of results **in input order**, even
  if later promises resolve first.
- Rejects as soon as **any** input rejects (with that reason).
- Resolves to `[]` for an empty array.

### `retry(fn, attempts)`
- `fn` returns a promise. Call it; if it rejects, retry — up to `attempts` total
  tries. Resolve with the first success; reject with the last error if all fail.

```js
await promiseAll([Promise.resolve(1), Promise.resolve(2)]) // [1, 2]
await retry(() => mayFail(), 3) // resolves if any of 3 tries succeeds
```

## Likely follow-ups

1. "Implement `promiseAllSettled`." → never reject; collect `{status, value/reason}`.
2. "Add a delay between retries (backoff)." → `await sleep(ms)` between tries.
3. "Implement `race`." → resolve/reject with the first to settle.

## What they're evaluating

- Understanding the Promise constructor (`new Promise((resolve, reject) => …)`).
- Tracking completion count + preserving order by index.
- Recursion/loop for retry, and propagating the final error.

Reference: `solution.js`. Self-check: `npx vitest run src/live-coding/11-promise-utils`
