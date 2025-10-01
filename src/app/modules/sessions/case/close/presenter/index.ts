import { useParams } from '@tanstack/react-router'

import { useCloseSessionRequest } from '@/app/modules/sessions/case/close/request'

const useCloseSessionPresenter = () => {
  const { mutateAsync } = useCloseSessionRequest()
  const { id } = useParams({ from: '/session/$id' })

  const handleCloseSession = async () => {
    await mutateAsync({ id })
  }

  return {
    handleCloseSession,
  }
}

export { useCloseSessionPresenter }
