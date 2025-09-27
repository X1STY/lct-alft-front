import type { IEmployeeCollectionDto } from '@/domain/employees/interface/dto'

const getEmployeesCollection = async (): Promise<IEmployeeCollectionDto> => {
  const mockEmployees: IEmployeeCollectionDto = [
    { id: '1', name: 'Иванов И. И' },
    { id: '2', name: 'Киров К. К' },
    { id: '3', name: 'Летаев Л. Д.' },
    { id: '4', name: 'Воронов К. Т.' },
  ]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEmployees)
    }, 500)
  })
}

export { getEmployeesCollection }
