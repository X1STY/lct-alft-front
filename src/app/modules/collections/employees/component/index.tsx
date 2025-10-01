import type { FC } from 'react'

import type { IEmployeeSelectProps } from '@/app/modules/collections/employees/interface'

import { useCollectionsContext } from '@/app/common/providers/collections/context'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/ui/components/select'
import { cn } from '@/app/utils/cn'

const EmployeesSelect: FC<IEmployeeSelectProps> = ({
  onChange,
  value = 'all',
  isRenderClearOption = true,
  className = '',
}) => {
  const { employeesCollection } = useCollectionsContext()

  return (
    <Select
      value={String(value)}
      onValueChange={(selectedValue) => {
        const newValue = selectedValue === 'all' ? '' : selectedValue
        onChange?.(newValue)
      }}>
      <SelectTrigger className={cn('bg-background w-[250px]', className)}>
        <SelectValue placeholder="Выберете сотрудника" />
      </SelectTrigger>
      <SelectContent>
        {Boolean(isRenderClearOption) && <SelectItem value="all">Все сотрудники</SelectItem>}
        {employeesCollection.map((employee) => (
          <SelectItem key={employee.id} value={String(employee.id)}>
            {employee.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { EmployeesSelect }
