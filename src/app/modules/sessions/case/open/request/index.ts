import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ISessionDto } from '@/domain/session/interface/dto'

import type { IOpenSessionPort } from '@/domain/session/interface/port'

import { openSession } from '@/data/repository/sessions'
import { EQueryKeys } from '@/domain/common/query/enum'

const useOpenSessionRequest = () => {
  const validateQuery = useQueryClient()
  const callback = (port: IOpenSessionPort) => openSession(port)

  const handleOnSuccess = async (data: ISessionDto) => {
    await validateQuery.invalidateQueries({
      queryKey: [EQueryKeys.GET_SESSION_LIST],
    })
    await validateQuery.invalidateQueries({
      queryKey: [EQueryKeys.GET_SESSION, { id: data.id }],
    })
  }

  return useMutation({
    mutationFn: callback,
    onSuccess: handleOnSuccess,
  })
}

export { useOpenSessionRequest }
