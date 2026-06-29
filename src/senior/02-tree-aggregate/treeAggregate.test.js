import { describe, it, expect } from 'vitest'
import { totalSize, countFiles } from './starter.js'

const TREE = {
  name: 'root',
  children: [
    { name: 'a.txt', size: 100 },
    {
      name: 'docs',
      children: [
        { name: 'b.txt', size: 50 },
        { name: 'images', children: [{ name: 'c.png', size: 200 }] },
      ],
    },
    { name: 'empty', children: [] },
  ],
}

describe('totalSize', () => {
  it('sums all file sizes in the subtree', () => {
    expect(totalSize(TREE)).toBe(350)
    expect(totalSize(TREE.children[1])).toBe(250) // docs
    expect(totalSize({ name: 'x.txt', size: 7 })).toBe(7) // a leaf
    expect(totalSize({ name: 'empty', children: [] })).toBe(0)
  })
})

describe('countFiles', () => {
  it('counts the leaves in the subtree', () => {
    expect(countFiles(TREE)).toBe(3)
    expect(countFiles(TREE.children[1])).toBe(2) // docs
    expect(countFiles({ name: 'x.txt', size: 7 })).toBe(1)
    expect(countFiles({ name: 'empty', children: [] })).toBe(0)
  })
})
