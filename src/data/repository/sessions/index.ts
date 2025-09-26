import { isNotNil } from 'es-toolkit'

import { isEmpty } from 'es-toolkit/compat'

import type { IGetSessionsPort } from '@/domain/session/interface/port'
import type { IGetSessionListDto, ISessionDto } from '@/domain/session/interface/dto'

import { ESessionStatus } from '@/domain/common/sessions/enum'

interface IMockSessions extends ISessionDto {
  employeeId: string
  kitId: string
}

const mockSessions: Array<IMockSessions> = [
  {
    id: '1',
    user: 'Иванов И.И.',
    kit: 'Набор инструментов №1',
    createdAt: new Date('2024-01-15T09:30:00'),
    status: ESessionStatus.OPENED,
    employeeId: 'emp001',
    kitId: 'kit001',
  },
  {
    id: '2',
    user: 'Петров П.П.',
    kit: 'Набор инструментов №2',
    createdAt: new Date('2024-01-14T14:20:00'),
    status: ESessionStatus.CLOSED,
    employeeId: 'emp002',
    kitId: 'kit002',
  },
  {
    id: '3',
    user: 'Сидоров С.С.',
    kit: 'Набор инструментов №3',
    createdAt: new Date('2024-01-16T11:45:00'),
    status: ESessionStatus.PENDING,
    employeeId: 'emp003',
    kitId: 'kit003',
  },
  {
    id: '4',
    user: 'Козлов К.К.',
    kit: 'Набор инструментов №1',
    createdAt: new Date('2024-01-13T16:10:00'),
    status: ESessionStatus.CLOSED,
    employeeId: 'emp004',
    kitId: 'kit001',
  },
  {
    id: '5',
    user: 'Морозов М.М.',
    kit: 'Набор инструментов №4',
    createdAt: new Date('2024-01-17T08:15:00'),
    status: ESessionStatus.OPENED,
    employeeId: 'emp005',
    kitId: 'kit004',
  },
  {
    id: '6',
    user: 'Волков В.В.',
    kit: 'Набор инструментов №2',
    createdAt: new Date('2024-01-12T13:30:00'),
    status: ESessionStatus.PENDING,
    employeeId: 'emp006',
    kitId: 'kit002',
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
        filteredSessions = filteredSessions.filter((session) => session.employeeId === port.employeeId)
      }

      if (isNotNil(port.kitId) && !isEmpty(port.kitId)) {
        filteredSessions = filteredSessions.filter((session) => session.kitId === port.kitId)
      }

      const result: IGetSessionListDto = filteredSessions.map(({ employeeId, kitId, ...session }) => session)

      resolve(result)
    }, 500)
  })
}

export { getSessionsList }
