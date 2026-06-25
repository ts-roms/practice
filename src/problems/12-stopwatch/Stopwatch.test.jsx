import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Stopwatch from './Stopwatch.jsx'

const click = (name) => fireEvent.click(screen.getByRole('button', { name }))

describe('Stopwatch', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('starts at 0', () => {
    render(<Stopwatch />)
    expect(screen.getByTestId('time')).toHaveTextContent('0')
  })

  it('counts up while running', () => {
    render(<Stopwatch />)
    click(/start/i)
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.getByTestId('time')).toHaveTextContent('3')
  })

  it('stop pauses and preserves time; start resumes', () => {
    render(<Stopwatch />)
    click(/start/i)
    act(() => vi.advanceTimersByTime(2000))
    click(/stop/i)
    act(() => vi.advanceTimersByTime(5000)) // should NOT advance while stopped
    expect(screen.getByTestId('time')).toHaveTextContent('2')
    click(/start/i)
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByTestId('time')).toHaveTextContent('3')
  })

  it('reset zeroes the time and stops', () => {
    render(<Stopwatch />)
    click(/start/i)
    act(() => vi.advanceTimersByTime(4000))
    click(/reset/i)
    expect(screen.getByTestId('time')).toHaveTextContent('0')
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.getByTestId('time')).toHaveTextContent('0')
  })
})
