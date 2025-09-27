import type { FC } from 'react'

import type { IKitsSelectProps } from '@/app/modules/collections/kits/interface'

import { useCollectionsContext } from '@/app/common/providers/collections/context'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/ui/components/select'

const KitsSelect: FC<IKitsSelectProps> = ({ onChange, value = 'all', isRenderClearOption = true }) => {
  const { kitCollection } = useCollectionsContext()

  return (
    <Select
      value={value}
      onValueChange={(selectedValue) => {
        const newValue = selectedValue === 'all' ? '' : selectedValue
        onChange?.(newValue)
      }}>
      <SelectTrigger className="bg-background w-[250px]">
        <SelectValue placeholder="Выберете набор" />
      </SelectTrigger>
      <SelectContent>
        {Boolean(isRenderClearOption) && <SelectItem value="all">Все сотрудники</SelectItem>}
        {kitCollection.map((kit) => (
          <SelectItem key={kit.id} value={kit.id}>
            {kit.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { KitsSelect }
