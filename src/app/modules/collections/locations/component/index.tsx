import type { FC } from 'react'

import type { ILocationsSelectProps } from '@/app/modules/collections/locations/interface'

import { useCollectionsContext } from '@/app/common/providers/collections/context'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/ui/components/select'

const LocationsSelect: FC<ILocationsSelectProps> = ({ onChange, value = 'all', isRenderClearOption = true }) => {
  const { locationCollection } = useCollectionsContext()

  return (
    <Select
      value={value}
      onValueChange={(selectedValue) => {
        const newValue = selectedValue === 'all' ? '' : selectedValue
        onChange?.(newValue)
      }}>
      <SelectTrigger className="bg-background w-[250px]">
        <SelectValue placeholder="Выберете станцию" />
      </SelectTrigger>
      <SelectContent>
        {Boolean(isRenderClearOption) && <SelectItem value="all">Все сотрудники</SelectItem>}
        {locationCollection.map((location) => (
          <SelectItem key={location.id} value={location.id}>
            {location.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { LocationsSelect }
