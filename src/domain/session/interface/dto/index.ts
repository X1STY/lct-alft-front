import type { ESessionStatus } from '@/domain/common/sessions/enum'

interface ISessionDto {
  id: string
  user: string
  kit: string
  createdAt: Date
  status: ESessionStatus
}

type IGetSessionListDto = Array<ISessionDto>

export type { ISessionDto, IGetSessionListDto }
