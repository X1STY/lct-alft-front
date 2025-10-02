import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import type { ITestManyImagesPort } from '@/domain/test-many-images/port'

import { TestManyImagesSchema } from '@/app/modules/test-many-images/case/list/validation'
import { useTestManyImagesRequest } from '@/app/modules/test-many-images/case/list/case/request'

const useTestManyImagesPresenter = () => {
  const form = useForm<ITestManyImagesPort>({
    resolver: zodResolver(TestManyImagesSchema),
  })

  const { mutateAsync, isPending, data: responseData, isError, reset } = useTestManyImagesRequest()

  const handleSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData()

    data.image.forEach((file: File) => {
      formData.append('images', file)
    })
    return mutateAsync(formData)
  })

  const clearData = () => {
    reset()
  }

  return {
    form,
    handleSubmit,
    isPending,
    data: responseData,
    isError,
    clearData,
  }
}

export { useTestManyImagesPresenter }
