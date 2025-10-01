import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { IPreCloseSessionPort } from '@/domain/session/interface/port'

import { preCloseSession } from '@/data/repository/sessions'
import { EQueryKeys } from '@/domain/common/query/enum'

const usePreCloseSessionRequest = () => {
  const validateQuery = useQueryClient()

  const callback = (port: IPreCloseSessionPort) => preCloseSession(port)

  const handleOnSuccess = async () => {
    await validateQuery.invalidateQueries({
      queryKey: [EQueryKeys.GET_SESSION],
    })
  }

  return useMutation({
    mutationFn: callback,
    onSuccess: handleOnSuccess,
  })
}

export { usePreCloseSessionRequest }
