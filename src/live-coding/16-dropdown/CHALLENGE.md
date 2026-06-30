# Live Coding 16 — Custom Dropdown / Select  ⏱ 20 min

## Interviewer prompt

> "Build a custom select dropdown (not the native `<select>`). A button shows the
> current choice; clicking it opens a list of options; picking one closes the menu
> and updates the button. It must close when you click **outside** it or press
> Escape."

## Requirements

- A trigger button (`data-testid="trigger"`) showing the selected value or a
  placeholder. `aria-expanded` reflects open state.
- Clicking it toggles a list of options (`role="listbox"`, each option
  `data-testid="option-{value}"`).
- Selecting an option updates the trigger, closes the menu, and calls `onChange`.
- **Click outside** the component closes it. **Escape** closes it.

## Likely follow-ups

1. "Add arrow-key navigation + Enter to select." → active index state.
2. "Make it accessible." → `aria-activedescendant`, roles, focus management.
3. "Why a `mousedown` document listener, not `click`?" → fires before the trigger's
   click re-opens it; and remember to **remove it on cleanup**.

## What's evaluated

- `useRef` on the container + a **document listener** added only while open, with
  proper `useEffect` cleanup (the #1 thing they watch for here).
- `ref.current.contains(e.target)` to detect outside clicks.

Reference: `Solution.jsx`.
