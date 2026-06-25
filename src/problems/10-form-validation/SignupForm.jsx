import { useState } from "react";

/**
 * PROBLEM 10 — Form with validation
 *
 * Props: onSubmit(values)
 *
 * Requirements (see SignupForm.test.jsx):
 *  - Two controlled inputs: email (placeholder "Email") and password (placeholder "Password").
 *  - Email is invalid unless it matches a basic email pattern (e.g. a@b.com).
 *    Show the message "Invalid email" in data-testid="email-error" when invalid & touched.
 *  - Password must be at least 6 characters. Show "Password too short" in
 *    data-testid="password-error" when invalid & touched.
 *  - The "Submit" button is DISABLED while the form is invalid.
 *  - When valid and submitted, call onSubmit({ email, password }).
 *  - Errors should only appear once the user has interacted with that field
 *    (don't show errors on a pristine empty form).
 */
export default function SignupForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TODO: validation (emailValid, passwordValid), "touched" tracking,
  //       disabled submit, and onSubmit on valid submit.
  //
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordValid = password.length >= 6;
  const isValid = emailValid && passwordValid;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) return;

    onSubmit({
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setTouched((prev) => ({ ...prev, email: true }));
        }}
        onBlur={() => {
          setTouched((prev) => ({ ...prev, email: true }));
        }}
      />
      {/* TODO: email error */}
      {touched.email && !emailValid && (
        <p data-testid="email-error">Invalid email</p>
      )}

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setTouched((prev) => ({
            ...prev,
            password: true,
          }));
        }}
        onBlur={() => {
          setTouched((prev) => ({
            ...prev,
            password: true,
          }));
        }}
      />
      {/* TODO: password error */}

      {touched.password && !passwordValid && (
        <p data-testid="password-error">Password too short</p>
      )}

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
