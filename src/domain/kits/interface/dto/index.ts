import type { IToolDto } from '@/domain/tools/dto'

interface IKitDto {
  id: string
  name: string
  toolsId: Array<Pick<IToolDto, 'id'>>
}

type IKitCollectionDto = Array<IKitDto>

export type { IKitDto, IKitCollectionDto }
