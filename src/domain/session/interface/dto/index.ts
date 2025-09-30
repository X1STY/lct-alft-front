import type { ESessionStatus } from '@/domain/common/sessions/enum'

interface ISessionDto {
  id: number
  receiver_id: number
  giver_id: number
  location_id: number
  kit_id: number
  status: ESessionStatus
  opened_at?: string
  returned_at?: string
  given_image_url?: string
  returned_image_url?: string
  created_at: string
  updated_at: string
}

type IGetSessionListDto = Array<ISessionDto>

export type { ISessionDto, IGetSessionListDto }
