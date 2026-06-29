# Live Coding 6 — OTP Input  ⏱ 20 min

## Interviewer prompt

> "Build a 6-box one-time-password input. Typing a digit jumps focus to the next
> box; Backspace on an empty box jumps to the previous one. Only digits allowed.
> Expose the full code."

## Requirements

- `length` boxes (default 6), each accepts a single digit.
- Typing a digit auto-advances focus to the next box.
- Backspace clears the current box; if it's already empty, focus the previous box
  (and clear it).
- Non-digit characters are ignored.
- Show the combined value in `data-testid="otp-value"`. Boxes are
  `data-testid="otp-input-{i}"`.

## Likely follow-ups

1. "Support paste — pasting `123456` fills all boxes." → handle `onPaste`, split.
2. "Call `onComplete(code)` when all boxes are filled."
3. "Why `useRef` and not state for the DOM nodes?" → refs hold the input elements
   to call `.focus()`; they don't drive rendering.

## What they're evaluating

- **Refs + imperative focus** management (the core skill here).
- Controlled inputs in an array with immutable updates.
- Keyboard handling (`onKeyDown` for Backspace vs `onChange` for digits).

## Hints (only if stuck)

- `const refs = useRef([])` then `ref={el => (refs.current[i] = el)}`.
- On change, take the last typed char: `e.target.value.replace(/\D/g,'').slice(-1)`.

Reference: `Solution.jsx`.
