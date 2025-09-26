'use client'

import { format } from 'date-fns'

import type { ColumnDef } from '@tanstack/react-table'

import type { ISessionDto } from '@/domain/session/interface/dto'

import type { ESessionStatus } from '@/domain/common/sessions/enum'

import { SessionStatusName } from '@/domain/common/sessions/enum'
import { Badge } from '@/app/ui/components/badge'
import { Button } from '@/app/ui/components/button'

const sessionsColumns: Array<ColumnDef<ISessionDto>> = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="text-muted-foreground font-mono text-sm">{row.getValue<string>('id')}</div>,
  },
  {
    accessorKey: 'user',
    header: 'Сотрудник',
    cell: ({ row }) => <div className="font-medium">{row.getValue<string>('user')}</div>,
  },
  {
    accessorKey: 'kit',
    header: 'Набор',
    cell: ({ row }) => <div>{row.getValue<string>('kit')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Время открытия',
    cell: ({ row }) => {
      const date = row.getValue<Date>('createdAt')
      return <div className="text-sm">{format(date, 'd MMMM, HH:mm')}</div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => {
      const status = row.getValue<ESessionStatus>('status')
      const statusText = SessionStatusName[status]

      const getStatusVariant = () => {
        switch (status) {
          case 0:
            return 'secondary'
          case 1:
            return 'default'
          case 2:
            return 'outline'
          default:
            return 'secondary'
        }
      }

      return <Badge variant={getStatusVariant()}>{statusText}</Badge>
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
]

export { sessionsColumns }
