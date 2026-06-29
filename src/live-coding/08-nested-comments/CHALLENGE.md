# Live Coding 8 — Nested Comments  ⏱ 20 min

## Interviewer prompt

> "Render a threaded comments tree. Each comment can have replies, which can have
> their own replies, to any depth. Indent each level. Let me collapse/expand a
> comment's replies."

## Data shape

```js
[{ id, text, replies: [{ id, text, replies: [...] }] }]
```

## Requirements

- Recursively render every comment; deeper levels are visually indented.
- Each comment node is `data-testid="comment-{id}"` and shows its `text`.
- A comment with replies has a toggle button to **hide/show** its replies
  (replies visible by default).

## Likely follow-ups

1. "Add a reply box on each comment." → local input state per node.
2. "Show a reply count." → `replies.length` (or recursive total).
3. "Why a recursive component?" → the data is a tree of unknown depth; a component
   that renders itself is the natural fit.
4. "Performance with thousands of nodes?" → virtualize / collapse by default / memo.

## What they're evaluating

- A **self-referential component** (renders itself for replies).
- Stable `key`s from comment ids.
- Per-node local state (collapse) without lifting everything up.

## Hints (only if stuck)

- Make a `Comment` component that maps `comment.replies` to `<Comment />`.
- Base case: a comment with no replies just renders its text.

Reference: `Solution.jsx`.
