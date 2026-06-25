/**
 * Presentational cart.
 * Props:
 *   items = [{ id, name, price, qty }]
 *   onInc(id), onDec(id), onRemove(id)
 *
 * TODO:
 *  - empty: render data-testid="empty-cart" => "Your cart is empty".
 *  - otherwise one line per item with data-testid="cart-item-{id}" showing
 *    name, qty (data-testid="qty-{id}"), subtotal "$<price*qty>", and
 *    "+", "−", "Remove" buttons.
 *  - data-testid="cart-count" = sum of quantities.
 *  - data-testid="cart-total" = "$<total>".
 */
export default function Cart({ items = [], onInc, onDec, onRemove }) {
  return (
    <div>
      <h3>Cart</h3>
      {/* TODO: empty state OR list of cart items + totals */}
    </div>
  )
}
