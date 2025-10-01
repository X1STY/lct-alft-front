import type { IBaseResponse } from '@/domain/common/http/interface'

interface ILocationDto {
  id: string
  name: string
}

type ILocationCollectionDto = IBaseResponse<Array<ILocationDto>>

export type { ILocationDto, ILocationCollectionDto }
