import { Navigate } from '@tanstack/react-router'

import { ERouterPath } from '@/domain/common/router/enum'

const NotFound = () => {
  return <Navigate to={ERouterPath.BASE} replace />
}

export { NotFound }
