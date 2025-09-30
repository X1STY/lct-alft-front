import type { IEmployeeCollectionDto } from '@/domain/employees/interface/dto'

import { api } from '@/app/common/providers/http/service'

const getEmployeesCollection = async (): Promise<IEmployeeCollectionDto> => {
  return api.get<IEmployeeCollectionDto>('/employee/')
}

export { getEmployeesCollection }
