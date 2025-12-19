import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Theme = 'minimal' | 'glass' | 'brutalist'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: Theme[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const themes: Theme[] = ['minimal', 'glass', 'brutalist']

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('minimal')

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    document.documentElement.dataset.theme = newTheme
  }

  useEffect(() => {
    // Initialize theme on mount
    document.documentElement.dataset.theme = theme
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
