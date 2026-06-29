import { describe, it, expect } from 'vitest'
import { buildTree } from './starter.js'

describe('buildTree', () => {
  it('nests children under their parents', () => {
    const flat = [
      { id: 1, parentId: null, name: 'root' },
      { id: 2, parentId: 1, name: 'a' },
      { id: 3, parentId: 1, name: 'b' },
      { id: 4, parentId: 2, name: 'a1' },
    ]
    expect(buildTree(flat)).toEqual([
      {
        id: 1,
        name: 'root',
        children: [
          { id: 2, name: 'a', children: [{ id: 4, name: 'a1', children: [] }] },
          { id: 3, name: 'b', children: [] },
        ],
      },
    ])
  })

  it('supports multiple roots and empty input', () => {
    expect(buildTree([])).toEqual([])
    const flat = [
      { id: 1, parentId: null, name: 'r1' },
      { id: 2, parentId: null, name: 'r2' },
    ]
    expect(buildTree(flat).map((n) => n.id)).toEqual([1, 2])
  })

  it('treats a node with an unknown parent as a root (orphan)', () => {
    const flat = [{ id: 9, parentId: 99, name: 'orphan' }]
    expect(buildTree(flat)).toEqual([{ id: 9, name: 'orphan', children: [] }])
  })
})
