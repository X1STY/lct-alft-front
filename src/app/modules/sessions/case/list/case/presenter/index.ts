import type { IGetSessionsPort } from '@/domain/session/interface/port'

import { useGetSessionListRequest } from '@/app/modules/sessions/case/list/case/request'

const useGetSessionListPresenter = (port: IGetSessionsPort) => {
  return useGetSessionListRequest(port)
}

export { useGetSessionListPresenter }
