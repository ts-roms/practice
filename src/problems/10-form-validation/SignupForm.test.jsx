import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import SignupForm from './SignupForm.jsx'

describe('SignupForm', () => {
  it('shows no errors on a pristine form', () => {
    render(<SignupForm />)
    expect(screen.queryByTestId('email-error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('password-error')).not.toBeInTheDocument()
  })

  it('validates the email field', async () => {
    const user = userEvent.setup()
    render(<SignupForm />)
    await user.type(screen.getByPlaceholderText('Email'), 'not-an-email')
    expect(screen.getByTestId('email-error')).toHaveTextContent(/invalid email/i)
    await user.clear(screen.getByPlaceholderText('Email'))
    await user.type(screen.getByPlaceholderText('Email'), 'user@site.com')
    expect(screen.queryByTestId('email-error')).not.toBeInTheDocument()
  })

  it('validates password length', async () => {
    const user = userEvent.setup()
    render(<SignupForm />)
    await user.type(screen.getByPlaceholderText('Password'), '123')
    expect(screen.getByTestId('password-error')).toHaveTextContent(/too short/i)
  })

  it('disables submit until valid, then submits the values', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<SignupForm onSubmit={onSubmit} />)

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled()

    await user.type(screen.getByPlaceholderText('Email'), 'user@site.com')
    await user.type(screen.getByPlaceholderText('Password'), 'secret123')

    const btn = screen.getByRole('button', { name: /submit/i })
    expect(btn).toBeEnabled()
    await user.click(btn)
    expect(onSubmit).toHaveBeenCalledWith({ email: 'user@site.com', password: 'secret123' })
  })
})
