import { createRootRouteWithContext, createRoute, createRouter } from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'

import { EIdentifyRoutePath } from '@/domain/common/router/enum'

import { BaseLayout } from '@/app/tools/layout/base/component'
import { NotFound } from '@/app/tools/layout/not-found/component'
import { ModuleLayout } from '@/app/tools/layout/module/component'
import { getTanstackQuery } from '@/app/common/providers/tanstack-query/provider'
import { SESSION_LIST_PAGE_ROUTE, SESSION_PAGE_ROUTE } from '@/app/modules/sessions/route'
import { TEST_MANY_IMAGES_ROUTE } from '@/app/modules/test-many-images/route'

const ROOT_ROUTE = createRootRouteWithContext<{
  queryClient: QueryClient
  crumbs?: string
}>()({
  component: BaseLayout,
  notFoundComponent: NotFound,
})

const MODULE_PAGE_ROUTE = createRoute({
  id: EIdentifyRoutePath.MODULE_PAGE_ROUTE,
  component: ModuleLayout,
  getParentRoute: () => ROOT_ROUTE,
})

const ROUTE_TREE = ROOT_ROUTE.addChildren([
  MODULE_PAGE_ROUTE.addChildren([SESSION_LIST_PAGE_ROUTE, TEST_MANY_IMAGES_ROUTE, SESSION_PAGE_ROUTE]),
])

const ROUTER = createRouter({
  routeTree: ROUTE_TREE,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  context: { ...getTanstackQuery() },
})

export { ROUTE_TREE, MODULE_PAGE_ROUTE, ROUTER }
