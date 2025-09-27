import { StrictMode } from 'react'

import './app/theme/index.css'
import { ru } from 'date-fns/locale'
import ReactDOM from 'react-dom/client'

import { setDefaultOptions } from 'date-fns'

import { RouterProvider } from '@tanstack/react-router'

import { TanstackQueryProvider } from '@/app/common/providers/tanstack-query/provider'
import { ROUTER } from '@/app/router/const'
import { ThemeProvider } from '@/app/common/providers/theme/provider'
import { CollectionsContextProvider } from '@/app/common/providers/collections/provider'

setDefaultOptions({ locale: ru })

const rootElement = document.getElementById('root')

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanstackQueryProvider>
        <ThemeProvider>
          <CollectionsContextProvider>
            <RouterProvider router={ROUTER} />
          </CollectionsContextProvider>
        </ThemeProvider>
      </TanstackQueryProvider>
    </StrictMode>,
  )
}
