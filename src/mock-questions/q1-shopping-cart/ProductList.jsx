/**
 * Presentational product list.
 * Props: products = [{ id, name, price }], onAdd(product)
 *
 * TODO: render each product in a row with data-testid="product-{id}",
 *       showing the name and "$<price>", plus an "Add" button calling onAdd.
 */
export default function ProductList({ products = [], onAdd }) {
  return (
    <div>
      <h3>Products</h3>
      {/* TODO: map products to rows */}
    </div>
  )
}
