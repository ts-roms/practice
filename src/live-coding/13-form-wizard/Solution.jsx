import { useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const STEPS = ['Name', 'Email', 'Review']

export default function FormWizard({ onSubmit }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', email: '' })

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const isStepValid = (s) => {
    if (s === 0) return form.name.trim() !== ''
    if (s === 1) return EMAIL_RE.test(form.email)
    return true
  }

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1))
  const back = () => setStep((s) => Math.max(0, s - 1))

  return (
    <div style={{ width: 280 }}>
      <p data-testid="step-indicator">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>

      {step === 0 && (
        <input placeholder="Name" value={form.name} onChange={update('name')} />
      )}
      {step === 1 && (
        <input placeholder="Email" value={form.email} onChange={update('email')} />
      )}
      {step === 2 && (
        <div data-testid="review">
          <p>Name: {form.name}</p>
          <p>Email: {form.email}</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <button onClick={back} disabled={step === 0}>Back</button>
        {step < STEPS.length - 1 ? (
          <button onClick={next} disabled={!isStepValid(step)}>Next</button>
        ) : (
          <button onClick={() => onSubmit?.(form)}>Submit</button>
        )}
      </div>
    </div>
  )
}
