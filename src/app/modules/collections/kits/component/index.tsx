import type { FC } from 'react'

import type { IKitsSelectProps } from '@/app/modules/collections/kits/interface'

import { useCollectionsContext } from '@/app/common/providers/collections/context'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/ui/components/select'
import { cn } from '@/app/utils/cn'

const KitsSelect: FC<IKitsSelectProps> = ({ onChange, value = 'all', isRenderClearOption = true, className = '' }) => {
  const { kitCollection } = useCollectionsContext()

  return (
    <Select
      value={String(value)}
      onValueChange={(selectedValue) => {
        const newValue = selectedValue === 'all' ? '' : selectedValue
        onChange?.(newValue)
      }}>
      <SelectTrigger className={cn('bg-background w-[250px]', className)}>
        <SelectValue placeholder="Выберете набор" />
      </SelectTrigger>
      <SelectContent>
        {Boolean(isRenderClearOption) && <SelectItem value="all">Все наборы</SelectItem>}
        {kitCollection.map((kit) => (
          <SelectItem key={kit.id} value={String(kit.id)}>
            {kit.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { KitsSelect }
