import type { IToolDto } from '@/domain/tools/dto'

import type { IBaseResponse } from '@/domain/common/http/interface'

interface IKitDto {
  id: string
  name: string
  toolsId: Array<Pick<IToolDto, 'id'>>
}

type IKitCollectionDto = IBaseResponse<Array<IKitDto>>

export type { IKitDto, IKitCollectionDto }
