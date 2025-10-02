import { useMutation } from '@tanstack/react-query'

import type { ITestManyImagesPort } from '@/domain/test-many-images/port'

import { testManyImages } from '@/data/repository/test-many-images'

const useTestManyImagesRequest = () => {
  const callback = (port: ITestManyImagesPort) => testManyImages(port)

  return useMutation({
    mutationFn: callback,
  })
}

export { useTestManyImagesRequest }
