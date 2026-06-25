# Q2 — Users Directory  (React, Intermediate)

> Mock HackerRank "Full Stack (Frontend)" question. Implement the requirements
> so the test cases pass. **Do not rename files, components, or exports.**
> Use the **exact** `data-testid` values listed below.

## Scenario

Build a searchable users directory. On load, the app fetches a list of users
from an API and displays them. A search box filters the list by name.

## Files

- `App.jsx` — fetches users, owns `status` + `query` state, renders the rest.
- `SearchBar.jsx` — controlled search input.
- `UserCard.jsx` — renders a single user.

## Requirements

### Loading / error
- On mount, `fetch('https://api.example.com/users')` and read `res.json()`.
- While the request is pending, show `data-testid="loading"` (text `Loading...`).
- If the response is not ok (`res.ok === false`) OR the fetch rejects, show
  `data-testid="error"` (text `Failed to load users`).

### Success
- Render a search input (from `SearchBar`) with placeholder `Search users`.
- Render each user with `data-testid="user-{id}"` showing the user's **name**
  and **email**.
- Typing in the search box filters users whose **name contains** the query
  (case-insensitive). Filtering is live (on every keystroke).
- Show the number of currently visible users in `data-testid="user-count"`.
- If the search matches no users, show `data-testid="no-results"` (text
  `No users found`) and render no user cards.

## API shape

```json
[{ "id": 1, "name": "Ada Lovelace", "email": "ada@example.com" }, ...]
```

## Run

```bash
npx vitest run src/mock-questions/q2-users-directory
```

Reference solution: `_solutions/mock-q2-*` (peek only after trying).
