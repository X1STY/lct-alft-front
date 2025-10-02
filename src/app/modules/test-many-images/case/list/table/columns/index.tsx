import { useMemo } from 'react'

import type { ColumnDef } from '@tanstack/react-table'

import type { IDetection } from '@/domain/test-many-images/dto'

const useDetectionColumns = (): Array<ColumnDef<IDetection>> => {
  return useMemo(
    () => [
      {
        accessorKey: 'class_id',
        header: 'ID класса',
      },
      {
        accessorKey: 'class_name',
        header: 'Название класса',
      },
      {
        accessorKey: 'confidence',
        header: 'Уверенность',
        cell: ({ getValue }) => {
          const value = getValue<number>()
          return `${(value * 100).toFixed(2)}%`
        },
      },
    ],
    [],
  )
}

export { useDetectionColumns }
