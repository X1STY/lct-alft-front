import { useMutation } from '@tanstack/react-query'

import type { ICreateSessionPort } from '@/domain/session/interface/port'

import { createSession } from '@/data/repository/sessions'

const useCreateSessionRequest = () => {
  const callback = (port: ICreateSessionPort) => createSession(port)

  const handleOnSuccess = () => {}

  return useMutation({
    mutationFn: callback,
    onSuccess: handleOnSuccess,
  })
}

export { useCreateSessionRequest }
