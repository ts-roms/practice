# Live Coding 17 — Like button (optimistic update)  ⏱ 20 min

## Interviewer prompt

> "Build a Like button with a count. When clicked it should update **immediately**
> (optimistic UI), then call the server. If the server call fails, roll the UI
> back. Explain the optimistic-update pattern as you go."

## Props

```js
<LikeButton initialCount={10} initialLiked={false} onToggle={(nextLiked) => Promise} />
```

## Requirements

- Show a heart toggle + count (`data-testid="like-button"`, `data-testid="like-count"`).
- On click: **optimistically** flip liked + adjust the count by ±1, then `await onToggle(nextLiked)`.
- If `onToggle` rejects: **revert** liked + count to what they were.
- `aria-pressed` reflects the liked state. Disable the button while the request is in flight.

## Likely follow-ups

1. "Debounce rapid clicks." → ignore while pending (the disable handles it).
2. "Why optimistic UI?" → instant feedback; the network is the slow part.
3. "What if many fail?" → show a toast; keep the rollback simple and correct.

## What's evaluated

- The **optimistic → await → rollback-on-error** flow done correctly.
- Reverting to the *previous* values (capture them before mutating).
- Not leaving the button stuck disabled (use `finally`).

Reference: `Solution.jsx`.
