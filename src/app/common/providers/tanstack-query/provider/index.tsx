import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import type { PropsWithChildren, ReactNode } from 'react'

import type { IGetTanstackQuery } from '@/app/common/providers/tanstack-query/interface'

const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
      networkMode: 'always',
    },
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      networkMode: 'always',
    },
  },
})

const getTanstackQuery: IGetTanstackQuery = () => {
  return { queryClient: QUERY_CLIENT }
}

const TanstackQueryProvider = ({ children }: PropsWithChildren): ReactNode => (
  <QueryClientProvider client={QUERY_CLIENT}>{children}</QueryClientProvider>
)

export { QUERY_CLIENT, getTanstackQuery, TanstackQueryProvider }
