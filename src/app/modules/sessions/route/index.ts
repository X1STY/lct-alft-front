import { createRoute } from '@tanstack/react-router'

import { MODULE_PAGE_ROUTE } from '@/app/router/const'
import { ERouterPath } from '@/domain/common/router/enum'

const SESSION_LIST_PAGE_ROUTE = createRoute({
  path: ERouterPath.SESSIONS,
  getParentRoute: () => MODULE_PAGE_ROUTE,
  loader: () => {
    return {
      crumb: 'Список сессий',
    }
  },
}).lazy(async () => import('../case/list/component/index.lazy').then((d) => d.SessionsListPageRoute))

const SESSION_PAGE_ROUTE = createRoute({
  path: ERouterPath.SESSION,
  getParentRoute: () => MODULE_PAGE_ROUTE,
  loader: () => {
    return {
      crumb: 'Просмотр информации о сессии',
    }
  },
}).lazy(async () => import('../case/get-one/component/index.lazy').then((d) => d.SessionPageRoute))

export { SESSION_LIST_PAGE_ROUTE, SESSION_PAGE_ROUTE }
