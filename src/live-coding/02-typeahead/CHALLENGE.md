# Live Coding 2 — Typeahead / Autocomplete  ⏱ 25 min

## Interviewer prompt

> "Build a search typeahead. As the user types, show a dropdown of matching
> suggestions from a given list. They should be able to pick one with the mouse
> or the keyboard. Walk me through it."

## Requirements

- A text input. Below it, a dropdown of suggestions whose text **contains** the
  query (case-insensitive). Hide the dropdown when the query is empty.
- **Keyboard:** ArrowDown / ArrowUp move the highlight; Enter selects the
  highlighted item; Escape closes the dropdown.
- **Mouse:** clicking a suggestion selects it.
- Selecting fills the input with the value and closes the dropdown.

## Likely follow-ups

1. "The list comes from an API — debounce the calls." → `useEffect` + `setTimeout`
   cleanup (mention `useDebounce`).
2. "Highlight the matching substring in each suggestion." → split on the match.
3. "Make it accessible." → `role="listbox"` / `role="option"` / `aria-activedescendant`.
4. "What if there are 10,000 items?" → virtualize, or cap + server-side search.

## What they're evaluating

- Controlled input + derived filtered list (not stored in state twice).
- Correct, wrap-around keyboard index math.
- Closing/opening logic without re-opening right after a selection.

## Hints (only if stuck)

- State: `query`, `open`, `activeIndex`. Suggestions are derived from `query`.
- Guard the keyboard handler with `if (!open) return`.

Reference: `Solution.jsx`. (You already drilled the async version in
`problems/14-autocomplete` — this is the synchronous, from-scratch version.)
