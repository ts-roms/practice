# Live Coding 14 — Toast Notifications  ⏱ 20 min

## Interviewer prompt

> "Build a toast system. A button adds a toast message; each toast auto-dismisses
> after 3 seconds, and the user can also dismiss it manually with an ×. Multiple
> toasts stack."

## Requirements

- An **"Add toast"** button creates a new toast with a unique id.
- Each toast (`data-testid="toast-{id}"`) shows a message and a dismiss button.
- Toasts auto-remove after 3000ms.
- Manual dismiss removes that toast immediately.
- Multiple toasts can be on screen at once (a stack/queue).

## Likely follow-ups

1. "Different toast types (success/error)." → pass a `type`, style accordingly.
2. "Pause the auto-dismiss timer on hover."
3. "Expose a `useToast()` API via Context so any component can trigger one."
4. "How do you avoid leaking timers?" → clear timers on dismiss/unmount.

## What they're evaluating

- Managing a **list with unique ids**, immutable add/remove.
- Timers for auto-dismiss and **not leaking** them (cleanup).
- Functional state updates inside async callbacks (no stale list).

## Hints (only if stuck)

- Keep `toasts` as an array of `{ id, message }`; generate ids with a ref counter.
- A robust pattern: a `<Toast>` child runs its own `useEffect` `setTimeout` and
  calls `onDismiss(id)` in cleanup — that way each timer is tied to its toast.

Reference: `Solution.jsx`.
