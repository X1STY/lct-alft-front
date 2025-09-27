interface ILocationDto {
  id: string
  name: string
}

type ILocationCollectionDto = Array<ILocationDto>

export type { ILocationDto, ILocationCollectionDto }
