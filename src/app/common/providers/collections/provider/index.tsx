import type { PropsWithChildren } from 'react'

import { CollectionsContext } from '@/app/common/providers/collections/context'
import { useGetEmployeeCollectionPresenter } from '@/app/modules/collections/employees/case/presenter'
import { useGetKitCollectionPresenter } from '@/app/modules/collections/kits/case/presenter'
import { useGetLocationCollectionPresenter } from '@/app/modules/collections/locations/case/presenter'

export const CollectionsContextProvider = ({ children }: PropsWithChildren) => {
  const { collection: employeesCollection } = useGetEmployeeCollectionPresenter()
  const { collection: kitCollection } = useGetKitCollectionPresenter()
  const { collection: locationCollection } = useGetLocationCollectionPresenter()

  return (
    <CollectionsContext.Provider value={{ employeesCollection, locationCollection, kitCollection }}>
      {children}
    </CollectionsContext.Provider>
  )
}
