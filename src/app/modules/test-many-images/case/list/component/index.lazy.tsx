import { createLazyRoute } from '@tanstack/react-router'

import { ERouterPath } from '@/domain/common/router/enum'
import { Input } from '@/app/ui/components/input'
import { Button } from '@/app/ui/components/button'

const TestManyImagesListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Input className="w-fit" type="file" />
        <Button>Отправить</Button>
      </div>
      <ul className="flex list-decimal flex-col gap-1">
        <li>Выберите архив изображений для загрузки в модель</li>
        <li>Нажмите "отправить"</li>
        <li>Дождитесь результата обработки изображений</li>
        <li>Сравните полученный результат с эталонным</li>
      </ul>
    </div>
  )
}

const TestManyImagesListPageRoute = createLazyRoute(ERouterPath.TEST_MANY_IMAGES)({
  component: TestManyImagesListPage,
})

export { TestManyImagesListPageRoute }
