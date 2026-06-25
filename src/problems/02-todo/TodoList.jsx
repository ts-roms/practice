import { useState } from "react";

/**
 * PROBLEM 02 — Todo list (the classic)
 *
 * Requirements (see TodoList.test.jsx):
 *  - Controlled text input with placeholder "Add todo".
 *  - "Add" button appends the trimmed input as a new todo, then clears the input.
 *  - Empty / whitespace-only input must NOT add a todo.
 *  - Each todo renders inside <li> with a checkbox and a "Delete" button.
 *  - Clicking the checkbox toggles "completed" (apply style textDecoration line-through).
 *  - Delete removes that todo.
 *  - Filter buttons: "All" | "Active" | "Completed" show the matching subset.
 *  - Show remaining active count in data-testid="remaining" (e.g. "2 left").
 */
export default function TodoList() {
  const [todos, setTodos] = useState([]); // { id, text, completed }
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'

  // TODO: addTodo, toggleTodo, deleteTodo, derived `visible` list, remaining count.
  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }
    if (filter === "completed") {
      return todo.completed;
    }
    return true;
  });

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <input
        placeholder="Add todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {/* TODO: Add button */}
      <button onClick={addTodo}>
        Add
      </button>

      {/* TODO: filter buttons (All / Active / Completed) */}
      <div>
        <button onClick={() => setFilter("all")}>
          All
        </button>
        <button onClick={() => setFilter("active")}>
          Active
        </button>
        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

      <ul>
        {/* TODO: render visible todos */}
        {visibleTodos?.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
          </li>
        ))}
      </ul>

      <p data-testid="remaining">{remaining} left</p>
    </div>
  );
}
