import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { IOpenSessionPort } from '@/domain/session/interface/port'

import { openSession } from '@/data/repository/sessions'
import { EQueryKeys } from '@/domain/common/query/enum'

const useOpenSessionRequest = () => {
  const validateQuery = useQueryClient()
  const callback = (port: IOpenSessionPort) => openSession(port)

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

export { useOpenSessionRequest }
