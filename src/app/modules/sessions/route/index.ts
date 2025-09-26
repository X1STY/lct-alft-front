import { createRoute } from '@tanstack/react-router'

import { MODULE_PAGE_ROUTE } from '@/app/router/const'
import { ERouterPath } from '@/domain/common/router/enum'

const SESSION_LIST_PAGE_ROUTE = createRoute({
  path: ERouterPath.BASE,
  getParentRoute: () => MODULE_PAGE_ROUTE,
}).lazy(async () => import('../case/list/component/index.lazy').then((d) => d.SessionsListPageRoute))

export { SESSION_LIST_PAGE_ROUTE }
