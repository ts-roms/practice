import { createContext, useContext, useState } from 'react'

/**
 * PROBLEM 13 — Theme toggle with Context API
 *
 * Demonstrates createContext / Provider / useContext (solving prop drilling).
 *
 * Requirements (see ThemeToggle.test.jsx):
 *  - Create a ThemeContext providing { theme, toggle }.
 *  - <ThemeProvider> holds the theme state ('light' by default) and a toggle().
 *  - useTheme() is a custom hook returning the context value.
 *  - <ThemeToggle> (a DEEPLY nested child — no props passed down) reads the
 *    context and renders:
 *      - data-testid="theme" showing the current theme text,
 *      - a "Toggle theme" button that flips light <-> dark.
 */

// TODO: createContext, ThemeProvider, useTheme hook.
const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // TODO: hold theme state + toggle, provide via context.
  // 
  const [theme, setTheme] = useState('light');

  const toggle = () => {
    setTheme((prev) => prev === 'light' ? 'dark' : 'light')
  }
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  // TODO: return useContext(ThemeContext)
  return useContext(ThemeContext)
}

export default function ThemeToggle() {
  // TODO: read theme + toggle from useTheme()
  const { theme, toggle } = useTheme();
  return (
    <div>
      <p data-testid="theme">{/* TODO: current theme */}{theme}</p>
      <button onClick={toggle}>{/* TODO: Toggle theme */}Toggle theme</button>
    </div>
  )
}
