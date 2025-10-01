import type { FC } from 'react'

import type { ILocationsSelectProps } from '@/app/modules/collections/locations/interface'

import { useCollectionsContext } from '@/app/common/providers/collections/context'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/ui/components/select'
import { cn } from '@/app/utils/cn'

const LocationsSelect: FC<ILocationsSelectProps> = ({
  onChange,
  value = 'all',
  isRenderClearOption = true,
  className = '',
}) => {
  const { locationCollection } = useCollectionsContext()

  return (
    <Select
      value={String(value)}
      onValueChange={(selectedValue) => {
        const newValue = selectedValue === 'all' ? '' : selectedValue
        onChange?.(newValue)
      }}>
      <SelectTrigger className={cn('bg-background w-[250px]', className)}>
        <SelectValue placeholder="Выберете станцию" />
      </SelectTrigger>
      <SelectContent>
        {Boolean(isRenderClearOption) && <SelectItem value="all">Все станции</SelectItem>}
        {locationCollection.map((location) => (
          <SelectItem key={location.id} value={String(location.id)}>
            {location.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { LocationsSelect }
