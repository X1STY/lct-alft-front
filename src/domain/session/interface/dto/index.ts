import type { ESessionStatus } from '@/domain/common/sessions/enum'

import type { IBaseResponse } from '@/domain/common/http/interface'

interface ISessionDto {
  id: string
  reciever_id: string
  location_id: string
  kit_id: string
  status: ESessionStatus
  created_at: string
  updated_at: string
}

interface ISessionToolDto {
  tool_name: string
  quantity_given: number
  quantity_returned: number
  quantity_required: number
}

interface ISessionDetailDto {
  id: string
  reciever_id: string
  giver_id: string
  location_id: string
  kit_id: string
  status: ESessionStatus
  given_image_url?: string
  returned_image_url?: string
  tools: Array<ISessionToolDto>
  created_at: string
  updated_at: string
}

type IGetSessionListDto = IBaseResponse<Array<ISessionDto>>

export type { ISessionDto, IGetSessionListDto, ISessionDetailDto, ISessionToolDto }
