import { snakeCase } from 'es-toolkit'

import type { IGetSessionListDto, ISessionDetailDto, ISessionDto } from '@/domain/session/interface/dto'

import type {
  ICloseSessionPort,
  ICreateSessionPort,
  IGetSessionPort,
  IGetSessionsPort,
  IOpenSessionPort,
  IPreCloseSessionPort,
} from '@/domain/session/interface/port'

import { api } from '@/app/common/providers/http/service'

const getSessionsList = async (params: IGetSessionsPort): Promise<IGetSessionListDto> => {
  const transformedParams: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      transformedParams[snakeCase(key)] = value
    }
  }

  return api.get<IGetSessionListDto>('/session/', { params: transformedParams })
}

const getOneSession = async ({ id }: IGetSessionPort): Promise<ISessionDetailDto> => {
  return api.get<ISessionDetailDto>(`/session/${id}`)
}

const createSession = async (port: ICreateSessionPort): Promise<ISessionDto> => {
  return api.postForm('/session/', port)
}

const openSession = async ({ id }: IOpenSessionPort): Promise<ISessionDto> => {
  return api.post(`/session/${id}/open`)
}

const preCloseSession = async ({ id, ...port }: IPreCloseSessionPort): Promise<ISessionDto> => {
  return api.postForm(`/session/${id}/preclose`, port)
}

const closeSession = async ({ id }: ICloseSessionPort): Promise<ISessionDto> => {
  return api.post(`/session/${id}/close`)
}

export { getSessionsList, getOneSession, createSession, openSession, closeSession, preCloseSession }
