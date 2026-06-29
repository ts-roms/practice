# Live Coding 9 — Calculator  ⏱ 25 min

## Interviewer prompt

> "Build a basic calculator: digits, the four operators, equals, and clear. It
> should chain operations — e.g. `2 + 3 × 4 =` should compute as you go. Don't
> use `eval`."

## Requirements

- Buttons: `0–9`, `+ − × ÷`, `=`, `C` (clear).
- A display (`data-testid="display"`) shows the current number/result.
- Pressing an operator after a number applies any pending operation (left-to-right
  chaining is fine — no operator precedence required unless asked).
- `=` computes the final result. `C` resets to `0`.
- Division by zero shows `Error` (or `Infinity` — state your choice).

## Likely follow-ups

1. "Add a decimal point." → guard against multiple dots.
2. "Add operator precedence." → shunting-yard, or parse to an expression tree.
3. "Keyboard support." → `onKeyDown` mapping.
4. "Why not `eval`?" → security (arbitrary code) + you can't control formatting.

## What they're evaluating

- A clear **state machine**: `display`, `previous`, `operator`, and a flag for
  "start a new number on next digit".
- Correct chaining (apply the pending op when a new operator is pressed).
- Edge cases: leading zeros, divide-by-zero, pressing `=` with no op.

## Hints (only if stuck)

- State: `display`, `prev` (number|null), `op` (string|null), `overwrite` (bool).
- A pure `compute(a, b, op)` helper keeps the logic testable.

Reference: `Solution.jsx`.
