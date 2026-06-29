# Live Coding 13 — Multi-step Form Wizard  ⏱ 25 min

## Interviewer prompt

> "Build a 3-step signup wizard: step 1 collects a name, step 2 an email, step 3
> reviews and submits. Next/Back navigation. You can't advance until the current
> step is valid. Show which step you're on."

## Requirements

- Three steps: **Name** → **Email** → **Review**.
- A step indicator (`data-testid="step-indicator"`) showing e.g. `Step 1 of 3`.
- **Next** is disabled until the current step is valid:
  - Step 1: name is non-empty (trimmed).
  - Step 2: email matches a basic pattern.
- **Back** returns to the previous step (disabled on step 1).
- Step 3 shows the entered name + email and a **Submit** that calls
  `onSubmit({ name, email })`.

## Likely follow-ups

1. "Persist data if the user goes back and forward." → keep one form-state object.
2. "Add a 4th step dynamically." → drive steps from an array/config.
3. "Show validation errors per field." → track touched + error messages.

## What they're evaluating

- One **form state object** shared across steps (not per-step state that resets).
- Derived per-step validity gating the Next button.
- Clean step navigation with boundaries (no step < 0 or > last).

## Hints (only if stuck)

- State: `step` (0..2) + `form` ({ name, email }).
- `isStepValid(step)` returns a boolean used to disable Next.

Reference: `Solution.jsx`.
