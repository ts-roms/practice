export default function ProductList({ products = [], onAdd }) {
  return (
    <div>
      <h3>Products</h3>
      {products.map((p) => (
        <div key={p.id} data-testid={`product-${p.id}`}>
          <span>{p.name}</span> <span>${p.price}</span>
          <button onClick={() => onAdd(p)}>Add</button>
        </div>
      ))}
    </div>
  )
}
