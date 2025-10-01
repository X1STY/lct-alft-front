import { useParams } from '@tanstack/react-router'

import { useOpenSessionRequest } from '@/app/modules/sessions/case/open/request'
import { SESSION_PAGE_ROUTE } from '@/app/modules/sessions/route'

const useOpenSessionPresenter = () => {
  const { mutateAsync } = useOpenSessionRequest()
  const { id } = useParams({ from: SESSION_PAGE_ROUTE.id })

  const handleOpenSession = async () => {
    await mutateAsync({ id })
  }

  return {
    handleOpenSession,
  }
}

export { useOpenSessionPresenter }
