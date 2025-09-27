import type { FC } from 'react'

import type { IEmployeeSelectProps } from '@/app/modules/collections/employees/interface'

import { useCollectionsContext } from '@/app/common/providers/collections/context'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/ui/components/select'

const EmployeesSelect: FC<IEmployeeSelectProps> = ({ onChange, value = 'all', isRenderClearOption = true }) => {
  const { employeesCollection } = useCollectionsContext()

  return (
    <Select
      value={value}
      onValueChange={(selectedValue) => {
        const newValue = selectedValue === 'all' ? '' : selectedValue
        onChange?.(newValue)
      }}>
      <SelectTrigger className="bg-background w-[250px]">
        <SelectValue placeholder="Выберете сотрудника" />
      </SelectTrigger>
      <SelectContent>
        {Boolean(isRenderClearOption) && <SelectItem value="all">Все сотрудники</SelectItem>}
        {employeesCollection.map((employee) => (
          <SelectItem key={employee.id} value={employee.id}>
            {employee.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { EmployeesSelect }
