import { createLazyRoute } from '@tanstack/react-router'

import { Loader2Icon } from 'lucide-react'

import { ERouterPath } from '@/domain/common/router/enum'
import { Input } from '@/app/ui/components/input'
import { Button } from '@/app/ui/components/button'
import { useTestManyImagesPresenter } from '@/app/modules/test-many-images/case/list/case/presenter'

const TestManyImagesListPage = () => {
  const { form, handleSubmit, isIdle, isPending } = useTestManyImagesPresenter()
  const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']
  return (
    <div className="flex w-full flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-row items-center gap-4">
        <Input
          onBeforeInput={() => {
            form.reset()
          }}
          className="w-fit"
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          {...form.register('image')}
        />
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2Icon className="animate-spin" />}
          Отправить
        </Button>
      </form>
      {isIdle && (
        <ul className="flex list-decimal flex-col gap-1 pl-4">
          <li>Нажмите на поле ввода ("Выбрать файлы")</li>
          <li>В появившемся диалоге зайдите в папку с изображениями, выделите все (CTRL+A) и подтвердите выбор</li>
          <li>Нажмите "отправить"</li>
          <li>Дождитесь результата обработки изображений</li>
          <li>Сравните полученный результат с эталонным</li>
        </ul>
      )}
    </div>
  )
}

const TestManyImagesListPageRoute = createLazyRoute(ERouterPath.TEST_MANY_IMAGES)({
  component: TestManyImagesListPage,
})

export { TestManyImagesListPageRoute }
