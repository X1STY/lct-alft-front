import { useGetKitCollectionRequest } from '@/app/modules/collections/kits/case/request'

const useGetKitCollectionPresenter = () => {
  const { data } = useGetKitCollectionRequest()

  const collection = data ?? []

  return { collection }
}

export { useGetKitCollectionPresenter }
