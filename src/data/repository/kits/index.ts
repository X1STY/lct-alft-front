import type { IKitCollectionDto } from '@/domain/kits/interface/dto'

const getKitsCollection = async (): Promise<IKitCollectionDto> => {
  const mockKits: IKitCollectionDto = [
    {
      id: '1111',
      name: 'Тестовый набор №11',
      toolsId: [{ id: 'tool-1' }, { id: 'tool-2' }, { id: 'tool-3' }],
    },
  ]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockKits)
    }, 500)
  })
}

export { getKitsCollection }
