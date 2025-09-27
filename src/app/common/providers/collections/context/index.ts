import { createContext, use } from 'react'

import type { ICollectionsContextProps } from '@/app/common/providers/collections/interface'

const CollectionsContext = createContext<ICollectionsContextProps | undefined>(undefined)

const useCollectionsContext = () => {
  const context = use(CollectionsContext)
  if (context === undefined) {
    throw new Error('useCollectionsContext must be used within a CollectionsProvider')
  }
  return context
}

export { useCollectionsContext, CollectionsContext }
