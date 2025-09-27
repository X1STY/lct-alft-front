import type { ILocationCollectionDto } from '@/domain/locations/interface/dto'

const getLocationsCollection = async (): Promise<ILocationCollectionDto> => {
  const mockLocations: ILocationCollectionDto = [
    { id: '1', name: 'VKO' },
    { id: '2', name: 'DME' },
    { id: '3', name: 'SVO' },
    { id: '4', name: 'LED' },
  ]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLocations)
    }, 500)
  })
}

export { getLocationsCollection }
