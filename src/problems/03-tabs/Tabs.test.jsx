import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Tabs from './Tabs.jsx'

const TABS = [
  { label: 'Profile', content: 'Profile content' },
  { label: 'Settings', content: 'Settings content' },
  { label: 'Billing', content: 'Billing content' },
]

describe('Tabs', () => {
  it('shows the first tab by default', () => {
    render(<Tabs tabs={TABS} />)
    expect(screen.getByTestId('panel')).toHaveTextContent('Profile content')
    expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('aria-selected', 'true')
  })

  it('switches content on click', async () => {
    const user = userEvent.setup()
    render(<Tabs tabs={TABS} />)
    await user.click(screen.getByRole('tab', { name: 'Billing' }))
    expect(screen.getByTestId('panel')).toHaveTextContent('Billing content')
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('aria-selected', 'false')
  })

  it('renders one tab button per item', () => {
    render(<Tabs tabs={TABS} />)
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })
})
