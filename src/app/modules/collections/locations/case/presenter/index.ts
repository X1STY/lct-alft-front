import { useGetLocationCollectionRequest } from '@/app/modules/collections/locations/case/request'

const useGetLocationCollectionPresenter = () => {
  const { data } = useGetLocationCollectionRequest()

  const collection = data ?? []

  return { collection }
}

export { useGetLocationCollectionPresenter }
