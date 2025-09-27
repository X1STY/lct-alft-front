import { useGetEmployeeCollectionRequest } from '@/app/modules/collections/employees/case/request'

const useGetEmployeeCollectionPresenter = () => {
  const { data } = useGetEmployeeCollectionRequest()

  const collection = data ?? []

  return { collection }
}

export { useGetEmployeeCollectionPresenter }
