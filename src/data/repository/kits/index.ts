import type { IKitCollectionDto } from '@/domain/kits/interface/dto'

import { api } from '@/app/common/providers/http/service'

const getKitsCollection = async (): Promise<IKitCollectionDto> => {
  return api.get<IKitCollectionDto>('/kit/')
}

export { getKitsCollection }
