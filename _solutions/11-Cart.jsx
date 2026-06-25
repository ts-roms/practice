import { useReducer } from 'react'

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.find((i) => i.id === action.product.id)
      if (existing) {
        return state.map((i) => (i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...state, { ...action.product, qty: 1 }]
    }
    case 'inc':
      return state.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i))
    case 'dec':
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    case 'clear':
      return []
    default:
      return state
  }
}

export default function Cart({ products = [] }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div>
      <div>
        {products.map((p) => (
          <button key={p.id} onClick={() => dispatch({ type: 'add', product: p })}>
            Add {p.name}
          </button>
        ))}
      </div>

      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <span>
              {i.name} x {i.qty}
            </span>
            <button onClick={() => dispatch({ type: 'inc', id: i.id })}>+</button>
            <button onClick={() => dispatch({ type: 'dec', id: i.id })}>-</button>
          </li>
        ))}
      </ul>

      <p data-testid="total">${total}</p>
      <button onClick={() => dispatch({ type: 'clear' })}>Clear</button>
    </div>
  )
}
