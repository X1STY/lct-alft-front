import { createContext, useContext, useEffect, useState } from 'react'

import { asyncNoop, isNotNil, noop } from 'es-toolkit'
import { flushSync } from 'react-dom'

import type { ITheme, IThemeProviderProps, IThemeProviderState } from '@/app/common/providers/theme/interface'

const initialState: IThemeProviderState = {
  theme: 'light',
  setTheme: noop,
  toggleTheme: asyncNoop,
}

const ThemeProviderContext = createContext<IThemeProviderState>(initialState)

function ThemeProvider({ children, storageKey = 'vite-ui-theme', ...props }: IThemeProviderProps) {
  const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const [theme, setTheme] = useState<ITheme>(() => (localStorage.getItem(storageKey) as ITheme) ?? defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    root.classList.add(theme)
  }, [theme])

  const toggleTheme = async () => {
    if (isNotNil(document.startViewTransition)) {
      await document.startViewTransition(() => {
        flushSync(() => {
          setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light'
            localStorage.setItem(storageKey, newTheme)
            return newTheme
          })
        })
      }).ready
    } else {
      setTheme((prevTheme) => {
        const newTheme = prevTheme === 'light' ? 'dark' : 'light'
        localStorage.setItem(storageKey, newTheme)
        return newTheme
      })
    }
  }
  const value = {
    theme,
    setTheme: (newTheme: ITheme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
    toggleTheme,
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
