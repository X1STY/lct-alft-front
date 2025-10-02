import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import type { ITestManyImagesPort } from '@/domain/test-many-images/port'

import { TestManyImagesSchema } from '@/app/modules/test-many-images/case/list/validation'
import { useTestManyImagesRequest } from '@/app/modules/test-many-images/case/list/case/request'

const useTestManyImagesPresenter = () => {
  const form = useForm<ITestManyImagesPort>({
    resolver: zodResolver(TestManyImagesSchema),
  })

  const { mutateAsync, isPending, data: responseData, isIdle } = useTestManyImagesRequest()
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data)
  })

  return {
    form,
    handleSubmit,
    isPending,
    data: responseData,
    isIdle,
  }
}

export { useTestManyImagesPresenter }
