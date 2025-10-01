import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ISessionDto } from '@/domain/session/interface/dto'

import type { IPreCloseSessionPort } from '@/domain/session/interface/port'

import { preCloseSession } from '@/data/repository/sessions'
import { EQueryKeys } from '@/domain/common/query/enum'

const usePreCloseSessionRequest = () => {
  const validateQuery = useQueryClient()

  const callback = (port: IPreCloseSessionPort) => preCloseSession(port)

  const handleOnSuccess = async (data: ISessionDto) => {
    await validateQuery.invalidateQueries({
      queryKey: [EQueryKeys.GET_SESSION, { id: data.id }],
    })
  }

  return useMutation({
    mutationFn: callback,
    onSuccess: handleOnSuccess,
  })
}

export { usePreCloseSessionRequest }
