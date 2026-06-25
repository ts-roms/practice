import { useState } from "react";

/**
 * PROBLEM 01 — Counter (warm-up)
 *
 * Requirements (see Counter.test.jsx):
 *  - Show the current count in an element with data-testid="count" (starts at 0).
 *  - "Increment" button increases count by 1.
 *  - "Decrement" button decreases count by 1.
 *  - "Reset" button sets count back to 0.
 *  - Count must never go below 0 (clamp at 0).
 */
export default function Counter() {
  const [count, setCount] = useState(0);

  // TODO: implement increment, decrement (clamped at 0), and reset.
  const increment = () => {
    setCount((prev) => prev + 1);
  };
  const decrement = () => {
      setCount((prev) => Math.max(0, prev - 1))
  };
  const reset = () => setCount(0);

  return (
    <div>
      <p data-testid="count">{count}</p>
      {/* TODO: add the three buttons */}
      <div>
        <button onClick={increment} data-testid="increment">Increment</button>
        <button onClick={decrement} data-testid="decrement">Decrement</button>
        <button onClick={reset} data-testid="reset">Reset</button>
      </div>
    </div>
  );
}
