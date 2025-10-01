import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useRouter } from '@tanstack/react-router'

import type { ISessionDto } from '@/domain/session/interface/dto'

import type { ICreateSessionPort } from '@/domain/session/interface/port'

import { createSession } from '@/data/repository/sessions'
import { EQueryKeys } from '@/domain/common/query/enum'
import { SESSION_PAGE_ROUTE } from '@/app/modules/sessions/route'

const useCreateSessionRequest = () => {
  const router = useRouter()
  const validateQuery = useQueryClient()

  const callback = (port: ICreateSessionPort) => createSession(port)

  const handleOnSuccess = async (data: ISessionDto) => {
    await validateQuery.invalidateQueries({
      queryKey: [EQueryKeys.GET_SESSION_LIST],
    })
    router.navigate({ to: SESSION_PAGE_ROUTE.to, params: { id: data.id } })
  }

  return useMutation({
    mutationFn: callback,
    onSuccess: handleOnSuccess,
  })
}

export { useCreateSessionRequest }
