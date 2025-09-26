import type { QueryClient } from '@tanstack/react-query'

type IGetTanstackQuery = () => {
  queryClient: QueryClient
}

export type { IGetTanstackQuery }
