import type { ESessionStatus } from '@/domain/common/sessions/enum'

interface ISessionDto {
  id: string
  reciever_id: string
  giver_id: string
  location_id: string
  kit_id: string
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
