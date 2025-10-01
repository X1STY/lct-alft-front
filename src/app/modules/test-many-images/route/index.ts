import { createRoute } from '@tanstack/react-router'

import { MODULE_PAGE_ROUTE } from '@/app/router/const'
import { ERouterPath } from '@/domain/common/router/enum'

const TEST_MANY_IMAGES_ROUTE = createRoute({
  path: ERouterPath.TEST_MANY_IMAGES,
  getParentRoute: () => MODULE_PAGE_ROUTE,
  loader: () => {
    return {
      crumb: 'Тест модели',
    }
  },
}).lazy(async () => import('../case/list/component/index.lazy').then((d) => d.TestManyImagesListPageRoute))

export { TEST_MANY_IMAGES_ROUTE }
