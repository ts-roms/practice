# Live Coding 10 — curry / compose / pipe  ⏱ 20 min

## Interviewer prompt

> "Implement three functional helpers in plain JS: `curry(fn)`, `compose(...fns)`,
> and `pipe(...fns)`. Explain what each does."

## What they do (say this first)

- **curry**: transform `f(a, b, c)` so it can be called `f(a)(b)(c)`, `f(a, b)(c)`,
  etc., until all args are supplied — then it runs.
- **compose**: combine functions **right-to-left**: `compose(f, g)(x) === f(g(x))`.
- **pipe**: combine functions **left-to-right**: `pipe(f, g)(x) === g(f(x))`.

## Requirements

```js
const add = (a, b, c) => a + b + c
const cAdd = curry(add)
cAdd(1)(2)(3)      // 6
cAdd(1, 2)(3)      // 6
cAdd(1)(2, 3)      // 6

const inc = x => x + 1
const dbl = x => x * 2
compose(inc, dbl)(5) // 11  (dbl first, then inc)
pipe(inc, dbl)(5)    // 12  (inc first, then dbl)
```

## Likely follow-ups

1. "Make compose/pipe accept multiple initial args." → spread into the first fn.
2. "Where is curry useful?" → partial application, point-free style, event handlers.
3. "Implement pipe in terms of reduce; compose in terms of reduceRight."

## What they're evaluating

- Closures + recursion (curry accumulating args until `fn.length` is met).
- Knowing `reduce` vs `reduceRight` for pipe vs compose.

Reference: `solution.js`. Self-check: `npx vitest run src/live-coding/10-curry-compose`
