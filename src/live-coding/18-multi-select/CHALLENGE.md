# Live Coding 18 — Multi-select with "Select all"  ⏱ 20 min

## Interviewer prompt

> "Render a checklist with a 'Select all' checkbox at the top. Select-all checks
> or unchecks everything. When only some items are selected, the select-all box
> should show the **indeterminate** (dash) state. Show a count of selected items."

## Requirements

- A list of items, each a checkbox (`data-testid="item-{id}"`).
- A "Select all" checkbox (`data-testid="select-all"`):
  - **checked** when every item is selected,
  - **indeterminate** when some (but not all) are selected,
  - **unchecked** when none are.
- Toggling select-all selects all / clears all.
- Show `data-testid="selected-count"` (e.g. `2 selected`).

## Likely follow-ups

1. "Filter the list, keep selection." → store selected ids in a Set, independent of render order.
2. "Disable some items." → skip them in select-all + the count.

## What's evaluated

- `indeterminate` is a **DOM property, not an attribute** — you can't set it in JSX;
  you set it via a **ref in `useEffect`**. Knowing this is the whole point.
- A `Set` of selected ids with immutable updates.

## Hints (only if stuck)

- `const allRef = useRef(null); useEffect(() => { allRef.current.indeterminate = some }, [some])`.
- `allChecked = selected.size === items.length`.

Reference: `Solution.jsx`.
