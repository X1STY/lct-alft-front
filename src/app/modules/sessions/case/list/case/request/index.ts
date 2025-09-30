import { useQuery } from '@tanstack/react-query'

import type { IGetSessionsPort } from '@/domain/session/interface/port'

import { getSessionsList } from '@/data/repository/sessions'
import { EQueryKeys } from '@/domain/common/query/enum'

const useGetSessionListRequest = (port: IGetSessionsPort) => {
  const callback = () => {
    return getSessionsList({ ...port, status: port.status.toLowerCase() })
  }

  return useQuery({
    queryFn: callback,
    queryKey: [EQueryKeys.GET_SESSION_LIST, port],
  })
}

export { useGetSessionListRequest }
