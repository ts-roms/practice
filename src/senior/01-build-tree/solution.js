export function buildTree(flat) {
  // Pass 1: index every node by id with an empty children array.
  const byId = new Map(flat.map((n) => [n.id, { id: n.id, name: n.name, children: [] }]))

  // Pass 2: link each node into its parent (or collect as a root).
  const roots = []
  for (const n of flat) {
    const node = byId.get(n.id)
    const parent = n.parentId != null ? byId.get(n.parentId) : null
    if (parent) parent.children.push(node)
    else roots.push(node) // root, or orphan with an unknown parent
  }
  return roots
}
