import type { ILocationCollectionDto } from '@/domain/locations/interface/dto'

import { api } from '@/app/common/providers/http/service'

const getLocationsCollection = async (): Promise<ILocationCollectionDto> => {
  return api.get<ILocationCollectionDto>('/location/')
}

export { getLocationsCollection }
