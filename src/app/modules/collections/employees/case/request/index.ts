import { useQuery } from '@tanstack/react-query'

import { EQueryKeys } from '@/domain/common/query/enum'
import { getEmployeesCollection } from '@/data/repository/employees'

const useGetEmployeeCollectionRequest = () => {
  const callback = () => getEmployeesCollection()

  return useQuery({
    queryFn: callback,
    queryKey: [EQueryKeys.GET_EMPLOYEE_COLLECTION],
  })
}

export { useGetEmployeeCollectionRequest }
