# Q1 — Shopping Cart  (React, Intermediate)

> Mock HackerRank "Full Stack (Frontend)" question. Implement the requirements
> so the test cases pass. **Do not rename files, components, or exports.**
> Use the **exact** `data-testid` values listed below.

## Scenario

You're given a small shop. A list of products is provided. Complete the
`ProductList` and `Cart` components (and the cart logic in `App`) so a user can
add products to a cart, change quantities, and see the running total.

## Files

- `App.jsx` — owns the cart state; wires `ProductList` + `Cart` (complete the logic).
- `ProductList.jsx` — presentational list of products with "Add" buttons.
- `Cart.jsx` — presentational cart with quantity controls and totals.
- `products.js` — the product data (do not edit).

## Requirements

### Product list
- Render every product. Each product row has `data-testid="product-{id}"`.
- Inside each row show the product **name** and its price as `$<price>`.
- Each row has an **"Add"** button that adds that product to the cart.

### Cart
- When the cart is empty, show an element with `data-testid="empty-cart"` and the
  text `Your cart is empty`.
- Otherwise, render one line per cart item with `data-testid="cart-item-{id}"`.
  Each line shows:
  - the product **name**,
  - the quantity in an element with `data-testid="qty-{id}"`,
  - the line subtotal (`price × qty`) as `$<subtotal>`,
  - a **"+"** button (increase qty by 1),
  - a **"−"** button (decrease qty by 1; if qty hits 0, remove the item),
  - a **"Remove"** button (remove the item entirely).
- Adding a product already in the cart increases its quantity instead of adding
  a duplicate line.
- Show the total number of items (sum of quantities) in `data-testid="cart-count"`.
- Show the total price in `data-testid="cart-total"` as `$<total>`.

## Run

```bash
npx vitest run src/mock-questions/q1-shopping-cart
```

Reference solution: `_solutions/mock-q1-*` (peek only after trying).
