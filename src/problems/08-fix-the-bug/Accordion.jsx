import { useState } from "react";

/**
 * PROBLEM 08 — FIX THE BUG
 *
 * This component is INTENTIONALLY broken. The tests describe the correct
 * behavior. Find and fix the bugs WITHOUT rewriting from scratch.
 *
 * Intended behavior:
 *  - Render one header <button> per section (its `title`).
 *  - Clicking a header toggles ONLY that section's body open/closed.
 *  - Multiple sections can be open at once.
 *  - An open section shows its `body` text; a closed one hides it.
 *
 * Hints — there are (at least) 3 bugs:
 *   1) State shape / update logic.
 *   2) A list `key` problem.
 *   3) A toggle that mutates instead of returning new state.
 */
export default function Accordion({ sections = [] }) {
  // BUG: boolean can only track ONE open section, not many.
  const [openSections, setOpenSections] = useState([]);

  const toggle = (i) => {
    // BUG: this doesn't allow multiple open, and compares wrong.
    setOpenSections((prev) =>
      prev.includes(i) ? prev.filter((index) => index !== i) : [...prev, i],
    );
  };

  return (
    <div>
      {sections.map((s, i) => (
        // BUG: using the array index as key.
        <div key={s.id}>
          <button onClick={() => toggle(i)}>{s.title}</button>
          {
            openSections.includes(i) && (
              <p>{s.body}</p>
            )
          }
        </div>
      ))}
    </div>
  );
}
