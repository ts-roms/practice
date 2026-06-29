const isFolder = (node) => Array.isArray(node.children)

export function totalSize(node) {
  if (!isFolder(node)) return node.size || 0
  return node.children.reduce((sum, child) => sum + totalSize(child), 0)
}

export function countFiles(node) {
  if (!isFolder(node)) return 1
  return node.children.reduce((count, child) => count + countFiles(child), 0)
}
