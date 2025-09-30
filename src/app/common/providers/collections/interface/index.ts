import type { IEmployeeDto } from '@/domain/employees/interface/dto'

import type { IKitDto } from '@/domain/kits/interface/dto'

import type { ILocationDto } from '@/domain/locations/interface/dto'

interface ICollectionsContextProps {
  employeesCollection: Array<IEmployeeDto>
  kitCollection: Array<IKitDto>
  locationCollection: Array<ILocationDto>
}

export type { ICollectionsContextProps }
