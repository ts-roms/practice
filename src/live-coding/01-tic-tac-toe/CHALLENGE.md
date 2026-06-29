# Live Coding 1 — Tic-Tac-Toe  ⏱ 25 min

## Interviewer prompt

> "Build a two-player Tic-Tac-Toe in React. Two players, X and O, take turns
> clicking cells on a 3×3 grid. Show whose turn it is, detect a winner, and add
> a button to reset the game. Talk me through your approach as you go."

## Requirements

- 3×3 grid of clickable cells.
- Players alternate X → O → X …
- Clicking an occupied cell, or after the game is won, does nothing.
- Show a status line: `Turn: X`, then `Winner: O`, or `Draw` if the board fills
  with no winner.
- A **Reset** button clears the board.

## Suggested testids (if you want to self-check)

- `data-testid="cell-{0..8}"`, `data-testid="status"`, a Reset button.

## Likely follow-ups (be ready)

1. "Highlight the 3 winning cells." → return the winning *line* from the checker.
2. "Make the board size N×N configurable." → generalize win-detection.
3. "Add undo." → keep a history array of board states.
4. "How would you test this?" → talk RTL: click cells, assert status.

## What they're evaluating

- **Derived state**: the winner is *computed* from the board, not stored separately.
- **Immutability**: copy the array before setting (`const next = [...board]`).
- Clean win-detection (the 8 lines), and handling the draw case.
- Clear narration of the data model first.

## Hints (only if stuck)

- State = one array of 9 (`Array(9).fill(null)`) + a boolean `xIsNext`.
- `WINS` = list of index triples; a winner exists if any triple holds 3 equal
  non-null marks.

Reference: `Solution.jsx`.
