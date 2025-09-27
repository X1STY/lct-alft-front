'use client'

import { useMemo } from 'react'
import { format } from 'date-fns'

import type { ColumnDef } from '@tanstack/react-table'

import type { ISessionDto } from '@/domain/session/interface/dto'
import type { ESessionStatus } from '@/domain/common/sessions/enum'

import { SessionStatusName } from '@/domain/common/sessions/enum'
import { Badge } from '@/app/ui/components/badge'
import { Button } from '@/app/ui/components/button'
import { useCollectionsContext } from '@/app/common/providers/collections/context'

const useSessionsColumns = (): Array<ColumnDef<ISessionDto>> => {
  const { employeesCollection, kitCollection, locationCollection } = useCollectionsContext()

  const findEmployeeName = (id: string): string => {
    const employee = employeesCollection.find((emp) => emp.id === id)
    return employee?.name ?? ''
  }

  const findKitName = (id: string): string => {
    const kit = kitCollection.find((kit) => kit.id === id)
    return kit?.name ?? ''
  }

  const findLocationName = (id: string): string => {
    const location = locationCollection.find((loc) => loc.id === id)
    return location?.name ?? ''
  }

  return useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (cell) => <div className="text-muted-foreground font-mono text-sm">{cell.getValue<string>()}</div>,
      },
      {
        accessorKey: 'reciever_id',
        header: 'Сотрудник',
        cell: (cell) => {
          const receiverId = cell.getValue<string>()
          const employeeName = findEmployeeName(receiverId)
          return <div className="font-medium">{employeeName}</div>
        },
      },
      {
        accessorKey: 'kit_id',
        header: 'Набор',
        cell: (cell) => {
          const kitId = cell.getValue<string>()
          const kitName = findKitName(kitId)
          return <div>{kitName}</div>
        },
      },
      {
        accessorKey: 'location_id',
        header: 'Станция',
        cell: (cell) => {
          const locationId = cell.getValue<string>()
          const locationName = findLocationName(locationId)
          return <div>{locationName}</div>
        },
      },
      {
        accessorKey: 'opened_at',
        header: 'Время открытия',
        cell: (cell) => {
          const date = cell.getValue<Date>()
          return <div className="text-sm">{format(date, 'd MMMM, HH:mm')}</div>
        },
      },
      {
        accessorKey: 'status',
        header: 'Статус',
        cell: (cell) => {
          const status = cell.getValue<ESessionStatus>()
          const statusText = SessionStatusName[status]

          return <Badge>{statusText}</Badge>
        },
      },
      {
        id: 'actions',
        header: '',
        cell: () => (
          <Button variant="ghost" size="sm">
            Детали сессии
          </Button>
        ),
      },
    ],
    [employeesCollection, kitCollection, locationCollection],
  )
}

export { useSessionsColumns }
