import { useState, useEffect, useRef } from "react";

/**
 * PROBLEM 14 — Autocomplete (async + keyboard navigation)  [ADVANCED]
 *
 * Props:
 *   fetchSuggestions(query) => Promise<string[]>
 *   onSelect(value)
 *   delay (debounce ms, default 300)
 *
 * Requirements (see Autocomplete.test.jsx):
 *  - Controlled input, placeholder "Search".
 *  - As the user types, debounce by `delay`, then call fetchSuggestions(query).
 *  - Render results in a <ul role="listbox"> with each item as <li role="option">.
 *  - Empty query -> no list shown.
 *  - Keyboard nav while the list is open:
 *      ArrowDown / ArrowUp move the highlight (wrap around). The highlighted
 *      option has data-active="true" (others "false").
 *      Enter selects the highlighted option.
 *      Escape closes the list.
 *  - Clicking an option selects it.
 *  - Selecting: set the input to the value, close the list, call onSelect(value),
 *    and DON'T immediately re-open the list from the resulting query change.
 */
export default function Autocomplete({
  fetchSuggestions,
  onSelect,
  delay = 300,
}) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  // TODO: debounced effect calling fetchSuggestions; keyboard handler; choose().

  const skipFetch = useRef(false);

  useEffect(() => {
    if (!query.trim()) {
      setItems([]);
      setOpen(false);
      return;
    }

    if (skipFetch.current) {
      skipFetch.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      const results = await fetchSuggestions(query);
      setItems(results);
      setOpen(true);
      setActive(-1);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [query, delay, fetchSuggestions]);

  const choose = (value) => {
    skipFetch.current = true;

    setQuery(value);
    setOpen(false);
    setActive(-1);

    onSelect(value);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open || items.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();

        setActive((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();

        setActive((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
      }

      if (e.key === "Enter") {
        if (active >= 0) {
          choose(items[active]);
        }
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, items, active]);

  return (
    <div>
      <input
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* TODO: render the listbox of options when open */}
      {open && items.length > 0 && (
        <ul role="listbox">
          {items.map((item, index) => (
            <li
              key={item}
              role="option"
              data-active={active === index}
              onClick={() => choose(item)}
              style={{ cursor: 'pointer'}}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
