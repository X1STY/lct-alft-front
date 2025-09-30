import { useMutation } from '@tanstack/react-query'

import { useRouter } from '@tanstack/react-router'

import type { ISessionDto } from '@/domain/session/interface/dto'

import type { ICreateSessionPort } from '@/domain/session/interface/port'

import { createSession } from '@/data/repository/sessions'

const useCreateSessionRequest = () => {
  const router = useRouter()

  const callback = (port: ICreateSessionPort) => createSession(port)

  const handleOnSuccess = (data: ISessionDto) => {
    router.navigate({ to: '/session/:id', params: { id: data.id } })
  }

  return useMutation({
    mutationFn: callback,
    onSuccess: handleOnSuccess,
  })
}

export { useCreateSessionRequest }
