import { useQuery } from '@tanstack/react-query'

import { EQueryKeys } from '@/domain/common/query/enum'
import { getLocationsCollection } from '@/data/repository/locations'

const useGetLocationCollectionRequest = () => {
  const callback = () => getLocationsCollection()

  return useQuery({
    queryFn: callback,
    queryKey: [EQueryKeys.GET_LOCATION_COLLECTION],
  })
}

export { useGetLocationCollectionRequest }
