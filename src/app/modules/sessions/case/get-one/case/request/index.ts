import { useQuery } from '@tanstack/react-query'

import { useParams } from '@tanstack/react-router'

import { getOneSession } from '@/data/repository/sessions'
import { EQueryKeys } from '@/domain/common/query/enum'
import { SESSION_PAGE_ROUTE } from '@/app/modules/sessions/route'

const useGetOneSessionRequest = () => {
  const { id } = useParams({ from: SESSION_PAGE_ROUTE.id })
  const callback = () => {
    return getOneSession({ id })
  }

  return useQuery({
    queryFn: callback,
    queryKey: [EQueryKeys.GET_SESSION, { id }],
  })
}

export { useGetOneSessionRequest }
