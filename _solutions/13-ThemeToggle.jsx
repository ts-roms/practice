import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <div>
      <p data-testid="theme">{theme}</p>
      <button onClick={toggle}>Toggle theme</button>
    </div>
  )
}
