import type { ReactNode } from 'react'

type ITheme = 'dark' | 'light'

type IThemeProviderProps = {
  children: ReactNode
  defaultTheme?: ITheme
  storageKey?: string
}

type IThemeProviderState = {
  theme: ITheme
  setTheme: (theme: ITheme) => void
  toggleTheme: () => Promise<void>
}

export type { IThemeProviderProps, IThemeProviderState, ITheme }
