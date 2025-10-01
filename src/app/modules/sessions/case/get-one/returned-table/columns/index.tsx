import { useMemo } from 'react'

import type { ColumnDef } from '@tanstack/react-table'

import type { ISessionToolDto } from '@/domain/session/interface/dto'

const useSessionToolsReturnedColumns = (): Array<ColumnDef<ISessionToolDto>> => {
  return useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (cell) => {
          return cell.row.index + 1
        },
      },
      {
        accessorKey: 'tool_name',
        header: 'Название инструмента',
      },
      {
        accessorKey: 'quantity_returned',
        header: 'Распознанное количество',
      },
      {
        accessorKey: 'quantity_required',
        header: 'Ожидаемое количество ',
      },
    ],
    [],
  )
}

export { useSessionToolsReturnedColumns }
