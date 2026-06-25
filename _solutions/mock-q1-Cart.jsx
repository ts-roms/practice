export default function Cart({ items = [], onInc, onDec, onRemove }) {
  if (items.length === 0) {
    return (
      <div>
        <h3>Cart</h3>
        <p data-testid="empty-cart">Your cart is empty</p>
      </div>
    )
  }

  const count = items.reduce((n, i) => n + i.qty, 0)
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div>
      <h3>Cart</h3>
      <ul>
        {items.map((i) => (
          <li key={i.id} data-testid={`cart-item-${i.id}`}>
            <span>{i.name}</span>
            <span data-testid={`qty-${i.id}`}>{i.qty}</span>
            <span>${i.price * i.qty}</span>
            <button onClick={() => onInc(i.id)}>+</button>
            <button onClick={() => onDec(i.id)}>−</button>
            <button onClick={() => onRemove(i.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p data-testid="cart-count">{count}</p>
      <p data-testid="cart-total">${total}</p>
    </div>
  )
}
