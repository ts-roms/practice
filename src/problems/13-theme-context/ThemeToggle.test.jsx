import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import ThemeToggle, { ThemeProvider } from './ThemeToggle.jsx'

// Render the toggle deeply nested to prove context (not props) supplies the value.
const Deep = () => (
  <div>
    <section>
      <ThemeToggle />
    </section>
  </div>
)

describe('ThemeToggle (Context)', () => {
  it('shows the default light theme', () => {
    render(
      <ThemeProvider>
        <Deep />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme')).toHaveTextContent(/light/i)
  })

  it('toggles between light and dark', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <Deep />
      </ThemeProvider>,
    )
    await user.click(screen.getByRole('button', { name: /toggle theme/i }))
    expect(screen.getByTestId('theme')).toHaveTextContent(/dark/i)
    await user.click(screen.getByRole('button', { name: /toggle theme/i }))
    expect(screen.getByTestId('theme')).toHaveTextContent(/light/i)
  })
})
