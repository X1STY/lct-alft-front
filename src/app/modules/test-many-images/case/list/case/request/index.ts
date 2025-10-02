import { useMutation } from '@tanstack/react-query'

import { testManyImages } from '@/data/repository/test-many-images'

const useTestManyImagesRequest = () => {
  const callback = (port: FormData) => testManyImages(port)

  return useMutation({
    mutationFn: callback,
  })
}

export { useTestManyImagesRequest }
