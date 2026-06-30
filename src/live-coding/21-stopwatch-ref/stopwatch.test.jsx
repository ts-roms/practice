import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Stopwatch from './Starter.jsx'

const click = (name) => fireEvent.click(screen.getByRole('button', { name }))

describe('Stopwatch (useRef)', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('starts at 0 and counts up while running', () => {
    render(<Stopwatch />)
    expect(screen.getByTestId('time')).toHaveTextContent('0')
    click(/start/i)
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.getByTestId('time')).toHaveTextContent('3')
  })

  it('clicking Start twice does not double-count (ref guard)', () => {
    render(<Stopwatch />)
    click(/start/i)
    click(/start/i)
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByTestId('time')).toHaveTextContent('1')
  })

  it('stop preserves time; reset zeroes it', () => {
    render(<Stopwatch />)
    click(/start/i)
    act(() => vi.advanceTimersByTime(2000))
    click(/stop/i)
    act(() => vi.advanceTimersByTime(5000)) // should not advance while stopped
    expect(screen.getByTestId('time')).toHaveTextContent('2')
    click(/reset/i)
    expect(screen.getByTestId('time')).toHaveTextContent('0')
  })

  it('records laps at the current time', () => {
    render(<Stopwatch />)
    click(/start/i)
    act(() => vi.advanceTimersByTime(2000))
    click(/lap/i)
    act(() => vi.advanceTimersByTime(3000))
    click(/lap/i)
    expect(screen.getByTestId('lap-0')).toHaveTextContent('2')
    expect(screen.getByTestId('lap-1')).toHaveTextContent('5')
  })
})
