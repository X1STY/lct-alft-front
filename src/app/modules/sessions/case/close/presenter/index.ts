import { useParams } from '@tanstack/react-router'

import { useCloseSessionRequest } from '@/app/modules/sessions/case/close/request'
import { SESSION_PAGE_ROUTE } from '@/app/modules/sessions/route'

const useCloseSessionPresenter = () => {
  const { mutateAsync, isPending } = useCloseSessionRequest()
  const { id } = useParams({ from: SESSION_PAGE_ROUTE.id })

  const handleCloseSession = async () => {
    await mutateAsync({ id })
  }

  return {
    handleCloseSession,
    isPending,
  }
}

export { useCloseSessionPresenter }
