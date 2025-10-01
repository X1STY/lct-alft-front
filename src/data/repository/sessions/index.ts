import type {
  ICloseSessionPort,
  ICreateSessionPort,
  IGetSessionPort,
  IGetSessionsPort,
  IOpenSessionPort,
  IPreCloseSessionPort,
} from '@/domain/session/interface/port'

import type { IGetSessionListDto, ISessionDto } from '@/domain/session/interface/dto'

import { api } from '@/app/common/providers/http/service'

const getSessionsList = async (params: IGetSessionsPort): Promise<IGetSessionListDto> => {
  return api.get<IGetSessionListDto>('/session/', { params })
}

const getOneSession = async ({ id }: IGetSessionPort): Promise<ISessionDto> => {
  return api.get<ISessionDto>(`/session/${id}`)
}

const createSession = async (port: ICreateSessionPort): Promise<ISessionDto> => {
  return api.postForm('/session/', port)
}

const openSession = async ({ id }: IOpenSessionPort): Promise<ISessionDto> => {
  return api.post(`/session/${id}/open/`)
}

const preCloseSession = async ({ id, ...port }: IPreCloseSessionPort): Promise<ISessionDto> => {
  return api.postForm(`/session/${id}/preclose`, port)
}

const closeSession = async ({ id }: ICloseSessionPort): Promise<ISessionDto> => {
  return api.post(`/session/${id}/close/`)
}

export { getSessionsList, getOneSession, createSession, openSession, closeSession, preCloseSession }
