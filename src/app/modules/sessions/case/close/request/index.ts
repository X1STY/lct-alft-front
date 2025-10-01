import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ISessionDto } from '@/domain/session/interface/dto'

import type { ICloseSessionPort } from '@/domain/session/interface/port'

import { closeSession } from '@/data/repository/sessions'
import { EQueryKeys } from '@/domain/common/query/enum'

const useCloseSessionRequest = () => {
  const validateQuery = useQueryClient()
  const callback = (port: ICloseSessionPort) => closeSession(port)

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

export { useCloseSessionRequest }
