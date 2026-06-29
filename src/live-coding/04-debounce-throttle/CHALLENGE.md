# Live Coding 4 — debounce & throttle  ⏱ 20 min

## Interviewer prompt

> "Implement `debounce(fn, delay)` and `throttle(fn, limit)` as plain JavaScript
> higher-order functions. Explain the difference between them first."

## The difference (say this first)

- **debounce**: wait until calls *stop* for `delay` ms, then run **once**. (Search-as-you-type.)
- **throttle**: run at most once per `limit` ms, no matter how many calls. (Scroll/resize handlers.)

## Requirements

```js
const d = debounce(fn, 300)
// calling d() repeatedly only runs fn 300ms after the LAST call

const t = throttle(fn, 300)
// calling t() repeatedly runs fn immediately, then at most once per 300ms
```

- Both must forward arguments and `this` to `fn`.
- debounce: each call resets the timer.
- throttle: first call runs immediately (leading edge).

## Likely follow-ups

1. "Add a `cancel()` method to debounce." → expose a function that clears the timer.
2. "Support a trailing call in throttle." → remember the last args and fire at the end.
3. "Where would each be used in a React app?" → debounce search input; throttle
   scroll/resize/mousemove.

## What they're evaluating

- Closures over the timer variable.
- Correct `apply(this, args)` forwarding (not losing context).
- Knowing the conceptual difference cold.

Reference: `solution.js`.
