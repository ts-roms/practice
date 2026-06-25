import { useState, useEffect } from "react";

/**
 * PROBLEM 09 — Modal / dialog
 *
 * Requirements (see Modal.test.jsx):
 *  - An "Open" button. No dialog is shown initially.
 *  - Clicking "Open" shows a dialog (role="dialog") containing the children/content
 *    and a "Close" button.
 *  - The dialog closes when:
 *      a) the "Close" button is clicked,
 *      b) the Escape key is pressed,
 *      c) the backdrop (data-testid="backdrop") is clicked.
 *  - Clicking INSIDE the dialog content must NOT close it.
 */
export default function Modal({ children = "Dialog content" }) {
  const [open, setOpen] = useState(false);

  // TODO: add an Escape-key listener via useEffect (only while open), with cleanup.
  //
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>
      {/* TODO: when open, render a backdrop (data-testid="backdrop") wrapping a
          role="dialog" element. Backdrop click closes; clicks inside the dialog
          should stopPropagation. Include a "Close" button. */}

      {open && (
        <div data-testid="backdrop" onClick={() => setOpen(false)}>
          <div role="dialog" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
