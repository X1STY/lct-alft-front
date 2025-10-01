import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ICloseSessionPort } from '@/domain/session/interface/port'

import { closeSession } from '@/data/repository/sessions'
import { EQueryKeys } from '@/domain/common/query/enum'

const useCloseSessionRequest = () => {
  const validateQuery = useQueryClient()
  const callback = (port: ICloseSessionPort) => closeSession(port)

  const handleOnSuccess = async () => {
    await validateQuery.invalidateQueries({
      queryKey: [EQueryKeys.GET_SESSION_LIST],
      type: 'all',
    })
    await validateQuery.invalidateQueries({
      queryKey: [EQueryKeys.GET_SESSION],
    })
  }

  return useMutation({
    mutationFn: callback,
    onSuccess: handleOnSuccess,
  })
}

export { useCloseSessionRequest }
