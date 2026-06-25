import { useState } from 'react'
import ProductList from './ProductList.jsx'
import Cart from './Cart.jsx'
import { PRODUCTS } from './products.js'

/**
 * Owns the cart state and wires the two presentational components.
 *
 * TODO:
 *  - addToCart(product): add to cart, or +1 qty if already present.
 *  - inc(id) / dec(id) (remove at qty 0) / remove(id).
 *  - pass the cart items + handlers to <Cart />.
 */
export default function App() {
  const [cart, setCart] = useState([]) // [{ id, name, price, qty }]

  const addToCart = (product) => {
    // TODO
  }

  return (
    <div>
      <ProductList products={PRODUCTS} onAdd={addToCart} />
      <Cart items={cart} onInc={() => {}} onDec={() => {}} onRemove={() => {}} />
    </div>
  )
}
