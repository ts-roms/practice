import { useState } from 'react'

// Live coding 13 — Multi-step Form Wizard. Build from CHALLENGE.md.
export default function FormWizard({ onSubmit }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', email: '' })

  // TODO: isStepValid(step), next/back with bounds, submit on the last step.

  return (
    <div>
      <p data-testid="step-indicator">{/* Step X of 3 */}</p>
      {/* TODO: render the current step + Back/Next/Submit */}
    </div>
  )
}
