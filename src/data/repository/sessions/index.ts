import type { ICreateSessionPort, IGetSessionsPort } from '@/domain/session/interface/port'
import type { IGetSessionListDto, ISessionDto } from '@/domain/session/interface/dto'

import { api } from '@/app/common/providers/http/service'

const getSessionsList = async (params: IGetSessionsPort): Promise<IGetSessionListDto> => {
  return api.get<IGetSessionListDto>('/session/', { params })
}

const createSession = async (port: ICreateSessionPort): Promise<ISessionDto> => {
  return api.postForm('/session/', port)
}

export { getSessionsList, createSession }
