# Q4 — Tasks CRUD App  (React, Full Stack / Frontend)

> Mock HackerRank "Full Stack (Frontend)" question — the most common shape.
> Your React app performs full **CRUD** against a REST API (provided/mocked).
> **Don't rename files, components, or exports.** Use the exact `data-testid`s.

## Scenario

Build a tasks manager backed by a REST API at base URL:

```
https://api.example.com/tasks
```

## API contract

| Action | Method & URL | Body | Returns |
|--------|--------------|------|---------|
| Read   | `GET /tasks` | — | `[{ id, title, completed }]` |
| Create | `POST /tasks` | `{ title, completed: false }` | the created task `{ id, title, completed }` |
| Update | `PATCH /tasks/{id}` | `{ completed }` | the updated task |
| Delete | `DELETE /tasks/{id}` | — | `{}` |

Send JSON: `headers: { 'Content-Type': 'application/json' }` and
`body: JSON.stringify(...)` for POST/PATCH.

## Requirements

### Read
- On mount, `GET` the tasks. While loading, show `data-testid="loading"`.
- Render each task in an element with `data-testid="task-{id}"` showing its **title**.
- Show the number of tasks in `data-testid="task-count"`.

### Create
- An input with placeholder `New task` and an **"Add"** button.
- Clicking "Add" with a non-empty (trimmed) title `POST`s it, then appends the
  **task returned by the server** to the list and clears the input.
- Empty/whitespace titles are ignored.

### Update (toggle completed)
- Each task has a checkbox reflecting its `completed` state.
- Toggling it `PATCH`es `{ completed: <new value> }` and updates the task.
- A completed task's title element has `data-completed="true"` (else `"false"`).

### Delete
- Each task has a **"Delete"** button that `DELETE`s it and removes it from the list.

## Run

```bash
npx vitest run src/mock-questions/q4-crud-app
```

Reference solution: `_solutions/mock-q4-App.jsx`.
