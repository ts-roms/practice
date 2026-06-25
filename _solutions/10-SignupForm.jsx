import { useState } from 'react'

const EMAIL_RE = /^\S+@\S+\.\S+$/

export default function SignupForm({ onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({ email: false, password: false })

  const emailValid = EMAIL_RE.test(email)
  const passwordValid = password.length >= 6
  const formValid = emailValid && passwordValid

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formValid) return
    onSubmit?.({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setTouched((t) => ({ ...t, email: true }))
        }}
      />
      {touched.email && !emailValid && <p data-testid="email-error">Invalid email</p>}

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setTouched((t) => ({ ...t, password: true }))
        }}
      />
      {touched.password && !passwordValid && <p data-testid="password-error">Password too short</p>}

      <button type="submit" disabled={!formValid}>
        Submit
      </button>
    </form>
  )
}
