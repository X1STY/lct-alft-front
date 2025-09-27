import { useQuery } from '@tanstack/react-query'

import { getKitsCollection } from '@/data/repository/kits'
import { EQueryKeys } from '@/domain/common/query/enum'

const useGetKitCollectionRequest = () => {
  const callback = () => getKitsCollection()

  return useQuery({
    queryFn: callback,
    queryKey: [EQueryKeys.GET_KIT_COLLECTION],
  })
}

export { useGetKitCollectionRequest }
