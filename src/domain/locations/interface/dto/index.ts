import type { IBaseResponse } from '@/domain/common/http/interface'

interface ILocationDto {
  id: number
  name: string
}

type ILocationCollectionDto = IBaseResponse<Array<ILocationDto>>

export type { ILocationDto, ILocationCollectionDto }
