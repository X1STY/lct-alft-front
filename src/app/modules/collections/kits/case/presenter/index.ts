import { useGetKitCollectionRequest } from '@/app/modules/collections/kits/case/request'

const useGetKitCollectionPresenter = () => {
  const { data } = useGetKitCollectionRequest()

  const collection = data?.items ?? []

  return { collection }
}

export { useGetKitCollectionPresenter }
