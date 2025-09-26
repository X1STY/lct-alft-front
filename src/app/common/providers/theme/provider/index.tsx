import { createContext, useContext, useEffect, useState } from 'react'

import type { ITheme, IThemeProviderProps, IThemeProviderState } from '@/app/common/providers/theme/interface'

const initialState: IThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<IThemeProviderState>(initialState)

function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'vite-ui-theme',
  ...props
}: IThemeProviderProps) {
  const [theme, setTheme] = useState<ITheme>(() => (localStorage.getItem(storageKey) as ITheme) ?? defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: ITheme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}

export { useTheme, ThemeProvider }
