# Live Coding 7 — Tags / Chips Input  ⏱ 20 min

## Interviewer prompt

> "Build a tag input. The user types a tag and presses Enter to add it as a chip.
> Each chip has an × to remove it. No empty or duplicate tags. Bonus: Backspace on
> an empty field removes the last chip."

## Requirements

- A text input with placeholder `Add tag`.
- **Enter** adds the trimmed value as a chip, then clears the input.
- Ignore empty/whitespace and **duplicate** values.
- Each chip (`data-testid="tag-{value}"`) has a remove button (`× `, accessible
  label `remove {value}`).
- **Backspace** on an empty input removes the last chip.

## Likely follow-ups

1. "Limit to N tags." → guard in the add handler; disable input at the cap.
2. "Make it case-insensitive for duplicates." → compare lowercased.
3. "Add comma as a separator too." → handle `,` in the keydown / split on change.
4. "Controlled component — lift tags up via props." → accept `value` + `onChange`.

## What they're evaluating

- Immutable array updates (add/remove).
- Keyboard handling for both Enter and Backspace.
- Dedupe logic and trimming — the edge cases.

## Hints (only if stuck)

- State: `tags` (array) + `text` (input). Derive nothing else.
- `onKeyDown`: Enter → add; Backspace + empty text → drop last.

Reference: `Solution.jsx`.
