import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Autocomplete from './Autocomplete.jsx'

const WORDS = ['apple', 'apricot', 'avocado', 'banana']
const makeFetch = () => vi.fn(async (q) => WORDS.filter((w) => w.startsWith(q)))

const activeText = () =>
  screen.getAllByRole('option').find((o) => o.getAttribute('data-active') === 'true')?.textContent

describe('Autocomplete', () => {
  it('shows nothing for empty query and fetches on type', async () => {
    const user = userEvent.setup()
    render(<Autocomplete fetchSuggestions={makeFetch()} delay={0} />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    await user.type(screen.getByPlaceholderText('Search'), 'ap')
    const options = await screen.findAllByRole('option')
    expect(options.map((o) => o.textContent)).toEqual(['apple', 'apricot'])
  })

  it('navigates with arrow keys (wrapping) and selects with Enter', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Autocomplete fetchSuggestions={makeFetch()} onSelect={onSelect} delay={0} />)
    const input = screen.getByPlaceholderText('Search')
    await user.type(input, 'a')
    await screen.findAllByRole('option') // apple, apricot, avocado

    await user.keyboard('{ArrowDown}')
    expect(activeText()).toBe('apple')
    await user.keyboard('{ArrowDown}')
    expect(activeText()).toBe('apricot')
    await user.keyboard('{ArrowUp}')
    expect(activeText()).toBe('apple')

    await user.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledWith('apple')
    expect(input).toHaveValue('apple')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('closes on Escape and selects on click', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Autocomplete fetchSuggestions={makeFetch()} onSelect={onSelect} delay={0} />)
    await user.type(screen.getByPlaceholderText('Search'), 'a')
    await screen.findAllByRole('option')

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    // type again to reopen, then click an option
    await user.type(screen.getByPlaceholderText('Search'), 'v')
    const opt = await screen.findByText('avocado')
    await user.click(opt)
    expect(onSelect).toHaveBeenCalledWith('avocado')
  })
})
