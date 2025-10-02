import { createLazyRoute } from '@tanstack/react-router'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

import { Loader2Icon } from 'lucide-react'
import { isNil, isNotNil } from 'es-toolkit'

import { useWatch } from 'react-hook-form'

import { ERouterPath } from '@/domain/common/router/enum'
import { Input } from '@/app/ui/components/input'
import { Button } from '@/app/ui/components/button'
import { useTestManyImagesPresenter } from '@/app/modules/test-many-images/case/list/case/presenter'
import { ImageResult } from '@/app/common/components/test-image-result/component'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/ui/components/form'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const TestManyImagesListPage = () => {
  const { form, handleSubmit, data, isPending, clearData } = useTestManyImagesPresenter()
  const selectedImages = useWatch({ control: form.control, name: 'image' })
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: data?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 450,
    overscan: 2,
    gap: 16,
  })

  return (
    <div className="flex w-full flex-col gap-6">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex flex-row items-center gap-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept={ACCEPTED_TYPES.join(',')}
                      className="w-fit"
                      onChange={(e) => {
                        const files = e.target.files
                        if (data && files && files.length > 0) {
                          clearData()
                        }
                        field.onChange(files ? Array.from(files) : [])
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <Button type="submit" disabled={isPending || !selectedImages?.length}>
            {isPending && <Loader2Icon className="animate-spin" />}
            Отправить
          </Button>
        </form>
      </Form>

      {isNil(data) && (
        <ul className="flex list-decimal flex-col gap-1 pl-4">
          <li>Нажмите на поле ввода ("Выбрать файлы")</li>
          <li>В появившемся диалоге зайдите в папку с изображениями, выделите все (CTRL+A) и подтвердите выбор</li>
          <li>Нажмите "отправить"</li>
          <li>Дождитесь результата обработки изображений (Может занять некоторое время для обработки)</li>
          <li>Сравните полученный результат с эталонным</li>
        </ul>
      )}

      {isNotNil(data) && isNotNil(selectedImages) && (
        <div className="flex flex-1 flex-col gap-6">
          <h2 className="text-xl font-semibold">Результаты обработки</h2>
          <div ref={parentRef} className="h-[calc(100vh-275px)] overflow-auto rounded-md">
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}>
              {virtualizer.getVirtualItems().map((virtualItem) => (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  ref={(node) => {
                    virtualizer.measureElement(node)
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualItem.start}px)`,
                  }}>
                  <ImageResult result={data[virtualItem.index]} index={virtualItem.index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const TestManyImagesListPageRoute = createLazyRoute(ERouterPath.TEST_MANY_IMAGES)({
  component: TestManyImagesListPage,
})

export { TestManyImagesListPageRoute }
