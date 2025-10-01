import { useParams } from '@tanstack/react-router'

import { useOpenSessionRequest } from '@/app/modules/sessions/case/open/request'

const useOpenSessionPresenter = () => {
  const { mutateAsync } = useOpenSessionRequest()
  const { id } = useParams({ from: 'session/$id' })

  const handleOpenSession = async () => {
    await mutateAsync({ id })
  }

  return {
    handleOpenSession,
  }
}

export { useOpenSessionPresenter }
