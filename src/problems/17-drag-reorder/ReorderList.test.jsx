import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ReorderList from './ReorderList.jsx'

const order = () => screen.getAllByRole('listitem').map((li) => li.textContent)

// Simulate an HTML5 drag of `from` onto `to`.
const drag = (fromValue, toValue) => {
  const from = screen.getByTestId(`item-${fromValue}`)
  const to = screen.getByTestId(`item-${toValue}`)
  fireEvent.dragStart(from)
  fireEvent.dragOver(to)
  fireEvent.drop(to)
}

describe('ReorderList', () => {
  it('renders the initial order', () => {
    render(<ReorderList initialItems={['A', 'B', 'C']} />)
    expect(order()).toEqual(['A', 'B', 'C'])
  })

  it('moves an item down (A onto C)', () => {
    render(<ReorderList initialItems={['A', 'B', 'C']} />)
    drag('A', 'C')
    expect(order()).toEqual(['B', 'C', 'A'])
  })

  it('moves an item up (C onto A)', () => {
    render(<ReorderList initialItems={['A', 'B', 'C']} />)
    drag('C', 'A')
    expect(order()).toEqual(['C', 'A', 'B'])
  })

  it('dropping an item on itself is a no-op', () => {
    render(<ReorderList initialItems={['A', 'B', 'C']} />)
    drag('B', 'B')
    expect(order()).toEqual(['A', 'B', 'C'])
  })
})
