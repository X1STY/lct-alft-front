import { isNotNil } from 'es-toolkit'

import { isEmpty } from 'es-toolkit/compat'

import type { ICreateSessionPort, IGetSessionsPort } from '@/domain/session/interface/port'
import type { IGetSessionListDto, ISessionDto } from '@/domain/session/interface/dto'

import { ESessionStatus } from '@/domain/common/sessions/enum'

const mockSessions: Array<ISessionDto> = [
  {
    id: '1',
    reciever_id: '1',
    giver_id: '2',
    location_id: '1',
    kit_id: '1111',
    status: ESessionStatus.CLOSED,
    opened_at: '2024-01-15T09:30:00Z',
    given_image_url: 'https://example.com/images/given1.jpg',
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-15T09:30:00Z',
  },
  {
    id: '2',
    reciever_id: '2',
    giver_id: '3',
    location_id: '2',
    kit_id: '1111',
    status: ESessionStatus.CLOSED,
    opened_at: '2024-01-14T14:20:00Z',
    returned_at: '2024-01-14T18:00:00Z',
    given_image_url: 'https://example.com/images/given2.jpg',
    returned_image_url: 'https://example.com/images/returned2.jpg',
    created_at: '2024-01-14T14:00:00Z',
    updated_at: '2024-01-14T18:00:00Z',
  },
  {
    id: '4',
    reciever_id: '4',
    giver_id: '1',
    location_id: '4',
    kit_id: '1111',
    status: ESessionStatus.CLOSED,
    opened_at: '2024-01-13T16:10:00Z',
    returned_at: '2024-01-13T20:30:00Z',
    given_image_url: 'https://example.com/images/given4.jpg',
    returned_image_url: 'https://example.com/images/returned4.jpg',
    created_at: '2024-01-13T16:00:00Z',
    updated_at: '2024-01-13T20:30:00Z',
  },
  {
    id: '5',
    reciever_id: '1',
    giver_id: '3',
    location_id: '1',
    kit_id: '1111',
    status: ESessionStatus.OPENED,
    opened_at: '2024-01-17T08:15:00Z',
    given_image_url: 'https://example.com/images/given5.jpg',
    created_at: '2024-01-17T08:00:00Z',
    updated_at: '2024-01-17T08:15:00Z',
  },
  {
    id: '6',
    reciever_id: '2',
    giver_id: '4',
    location_id: '2',
    kit_id: '1111',
    status: ESessionStatus.CLOSED,
    opened_at: '2024-01-12T13:30:00Z',
    given_image_url: 'https://example.com/images/given6.jpg',
    created_at: '2024-01-12T13:00:00Z',
    updated_at: '2024-01-12T13:30:00Z',
  },
]

const getSessionsList = async (port: IGetSessionsPort): Promise<IGetSessionListDto> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredSessions = mockSessions

      console.log('Filter status:', port.status)
      if (isNotNil(port.status)) {
        filteredSessions = filteredSessions.filter((session) => session.status === port.status)
      }
      if (isNotNil(port.employeeId) && !isEmpty(port.employeeId)) {
        filteredSessions = filteredSessions.filter((session) => session.reciever_id === port.employeeId)
      }

      if (isNotNil(port.locationId) && !isEmpty(port.locationId)) {
        filteredSessions = filteredSessions.filter((session) => session.location_id === port.locationId)
      }

      resolve(filteredSessions)
    }, 500)
  })
}

const createSession = async (port: ICreateSessionPort) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(port)
      console.log(port)
    }, 1)
  })
}

export { getSessionsList, createSession }
