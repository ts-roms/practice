# Live Coding 19 — Inline-editable list  ⏱ 20 min

## Interviewer prompt

> "Render a list of items. Double-clicking an item turns it into a text input so
> the user can rename it inline. Enter saves, Escape cancels, and blurring saves
> too. Empty values are ignored."

## Requirements

- Each item (`data-testid="item-{id}"`) shows its text; **double-click** enters
  edit mode for that item only.
- In edit mode, render an input (`data-testid="edit-input"`) pre-filled with the text.
- **Enter** (or blur) commits the trimmed value; **Escape** cancels (keeps the old value).
- An empty/whitespace value does not overwrite the item.
- Only one item is editable at a time.

## Likely follow-ups

1. "Auto-focus the input." → `autoFocus`, or a ref + `.focus()` in an effect.
2. "Add delete + add-new." → it becomes a mini todo.
3. "Why track `editingId` not a boolean?" → so exactly one row is in edit mode.

## What's evaluated

- Mode state (`editingId`) + a `draft` value, immutable update on save.
- Handling Enter/Escape/blur distinctly.
- Stable keys (use item ids, not the index).

Reference: `Solution.jsx`.
