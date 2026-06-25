import { useState } from "react";

/**
 * PROBLEM 07 — Pagination
 *
 * Props: items (array), pageSize (number)
 *
 * Requirements (see Pagination.test.jsx):
 *  - Show only the current page's slice of items, each in an <li>.
 *  - "Prev" and "Next" buttons change the page.
 *  - "Prev" disabled on the first page; "Next" disabled on the last page.
 *  - Show "Page X of Y" in data-testid="page-info" (1-based).
 */
export default function Pagination({ items = [], pageSize = 5 }) {
  const [page, setPage] = useState(0); // 0-based internally

  // TODO: totalPages, current slice, clamp page, disabled logic.
  //
  const totalPages = Math.ceil(items.length / pageSize);

  const currentItems = items.slice(page * pageSize, (page + 1) * pageSize);

  const goPrev = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const goNext = () => {
    setPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div>
      <ul>
        {/* TODO: current page items */}

        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={goPrev} disabled={page === 0}>
        {/* Prev */}
        Prev
      </button>
      <span data-testid="page-info">
        {/* Page X of Y */}
        Page {page + 1} of {totalPages}
      </span>
      <button onClick={goNext} disabled={page === totalPages - 1}>
        {/* Next */}
        Next
      </button>
    </div>
  );
}
