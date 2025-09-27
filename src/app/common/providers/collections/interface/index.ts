import type { IKitCollectionDto } from '@/domain/kits/interface/dto'

import type { IEmployeeCollectionDto } from '@/domain/employees/interface/dto'

import type { ILocationCollectionDto } from '@/domain/locations/interface/dto'

interface ICollectionsContextProps {
  employeesCollection: IEmployeeCollectionDto
  kitCollection: IKitCollectionDto
  locationCollection: ILocationCollectionDto
}

export type { ICollectionsContextProps }
