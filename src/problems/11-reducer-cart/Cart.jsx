import { useReducer } from "react";

/**
 * PROBLEM 11 — Shopping cart with useReducer
 *
 * Props: products = [{ id, name, price }]
 *
 * Requirements (see Cart.test.jsx):
 *  - For each product render an "Add {name}" button.
 *  - Adding a product adds a cart line (or +1 qty if already in cart).
 *  - Each cart line shows "{name} x {qty}" and has "+" and "-" buttons.
 *  - "-" decrements qty; at qty 1 pressing "-" REMOVES the line.
 *  - data-testid="total" shows the total price (sum of price*qty), e.g. "$25".
 *  - A "Clear" button empties the cart.
 *  - Use useReducer (not useState) for the cart state.
 */

// TODO: implement the reducer.
function cartReducer(state, action) {
  switch (action.type) {
    // TODO: 'add' | 'inc' | 'dec' | 'clear'
    case "add": {
      const existing = state.find((item) => item.id === action.product.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [
        ...state,
        {
          ...action.product,
          qty: 1,
        },
      ];
    }
    case "inc": {
      return state.map((item) =>
        item.id === action.id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item,
      );
    }
    case "dec": {
      return state
        .map((item) =>
          item.id === action.id ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0);
    }
    case "clear": {
      return [];
    }
    default:
      return state;
  }
}

export default function Cart({ products = [] }) {
  const [items, dispatch] = useReducer(cartReducer, []); // [{ id, name, price, qty }]

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0); // TODO: compute from items

  return (
    <div>
      <div>
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => dispatch({ type: "add", product: p })}
          >
            Add {p.name}
          </button>
        ))}
      </div>

      <ul>
        {/* TODO: render cart lines with + / - buttons */}
        {items.map((item) => (
          <li key={item.id}>
            {item.name} x {item.qty}
            <button
              onClick={() => {
                dispatch({
                  type: "inc",
                  id: item.id,
                });
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "dec",
                  id: item.id,
                });
              }}
            >
              -
            </button>
          </li>
        ))}
      </ul>

      <p data-testid="total">${total}</p>
      {/* TODO: Clear button */}
      <button onClick={() => dispatch({ type: "clear" })}>Clear</button>
    </div>
  );
}
