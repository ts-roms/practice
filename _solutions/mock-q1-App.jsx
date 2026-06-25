import { useState } from 'react'
import ProductList from './ProductList.jsx'
import Cart from './Cart.jsx'
import { PRODUCTS } from './products.js'

export default function App() {
  const [cart, setCart] = useState([]) // [{ id, name, price, qty }]

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const inc = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)))

  const dec = (id) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0),
    )

  const remove = (id) => setCart((prev) => prev.filter((i) => i.id !== id))

  return (
    <div>
      <ProductList products={PRODUCTS} onAdd={addToCart} />
      <Cart items={cart} onInc={inc} onDec={dec} onRemove={remove} />
    </div>
  )
}
