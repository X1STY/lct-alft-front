import { createLazyRoute } from '@tanstack/react-router'

import { isNil, isNotNil } from 'es-toolkit'

import { CircleAlert } from 'lucide-react'

import { useState } from 'react'

import { ERouterPath } from '@/domain/common/router/enum'
import { useGetOneSessionPresenter } from '@/app/modules/sessions/case/get-one/case/presenter'
import { SessionHeader } from '@/app/common/components/session-header/component'
import { DataTable } from '@/app/ui/components/data-table'
import { useSessionToolsGivenColumns } from '@/app/modules/sessions/case/get-one/given-table/columns'
import { ESessionStatus } from '@/domain/common/sessions/enum'
import { Checkbox } from '@/app/ui/components/checkbox'
import { Label } from '@/app/ui/components/label'
import { Button } from '@/app/ui/components/button'
import { useOpenSessionPresenter } from '@/app/modules/sessions/case/open/presenter'
import { PreCloseSessionDialog } from '@/app/modules/sessions/case/preclose/component'
import { useCloseSessionPresenter } from '@/app/modules/sessions/case/close/presenter'
import { AspectRatio } from '@/app/ui/components/aspect-ratio'

const SessionPage = () => {
  const [isConfirmManual, setIsConfirmManual] = useState(false)
  const { data, isLoading } = useGetOneSessionPresenter()
  const sessionToolsColumns = useSessionToolsGivenColumns()
  const { handleOpenSession } = useOpenSessionPresenter()
  const { handleCloseSession } = useCloseSessionPresenter()

  if (isNil(data)) return null

  const isGivenQuantityError = data.tools
    .map((item) => item.quantity_required !== item.quantity_given)
    .reduce((item) => item)

  const isReturnedQuantityError = data.tools
    .map((item) => item.quantity_required !== item.quantity_returned)
    .reduce((item) => item)

  return (
    <div className="flex flex-col gap-4">
      <SessionHeader session={data} />
      <section className="flex flex-col gap-2">
        <h2 className="text-md text-neutral-500 uppercase">Выдача инструментов</h2>
        <div className="grid grid-cols-[35%_65%] gap-4">
          <div className="h-[360px] w-full">
            {isNotNil(data.given_image_url) ? (
              <AspectRatio ratio={3 / 2}>
                <img src={data.given_image_url} alt="Фото выданных инструментов" className="size-full object-cover" />
              </AspectRatio>
            ) : (
              <div className="size-full bg-gradient-to-br from-[#ffd0c2] to-[#3d3d3d]" />
            )}
          </div>
          <DataTable columns={sessionToolsColumns} isLoading={isLoading} data={data.tools} />
        </div>
        {isNotNil(isGivenQuantityError) && data.status === ESessionStatus.OPEN_WAITING_FOR_APPROVAL && (
          <>
            <div className="text-destructive bg-destructive/10 inline-flex items-center gap-1 rounded-md p-3 text-sm">
              <CircleAlert />
              Найдена аномалия распознавания! Активирован режим ручного пересчета инструментов. Для открытия сессии
              требуется подтверждение
            </div>
            <div className="inline-flex gap-1">
              <Checkbox
                id="manual-given-checkbox"
                checked={isConfirmManual}
                onCheckedChange={() => {
                  setIsConfirmManual((prev) => !prev)
                }}
              />
              <Label htmlFor="manual-given-checkbox">
                Ручной пересчет выполнен, набор укомплектован согласно спецификации
              </Label>
            </div>
            <Button onClick={handleOpenSession} disabled={!isConfirmManual} className="ml-auto w-fit">
              Выдать инструменты
            </Button>
          </>
        )}
      </section>
      {data.status === ESessionStatus.OPENED && (
        <div className="ml-auto w-fit">
          <PreCloseSessionDialog />
        </div>
      )}
      {(data.status === ESessionStatus.CLOSE_WAITING_FOR_APPROVAL || data.status === ESessionStatus.CLOSED) && (
        <section className="flex flex-col gap-2">
          <h2 className="text-md text-neutral-500 uppercase">Сдача инструментов</h2>
          <div className="grid grid-cols-[35%_65%] gap-4">
            <div className="h-[360px] w-full">
              {isNotNil(data.given_image_url) ? (
                <AspectRatio ratio={3 / 2}>
                  <img src={data.given_image_url} alt="Фото выданных инструментов" className="size-full object-cover" />
                </AspectRatio>
              ) : (
                <div className="size-full bg-gradient-to-br from-[#ffd0c2] to-[#3d3d3d]" />
              )}
            </div>
            <DataTable columns={sessionToolsColumns} isLoading={isLoading} data={data.tools} />
          </div>
          {isNotNil(isReturnedQuantityError) && data.status === ESessionStatus.CLOSE_WAITING_FOR_APPROVAL && (
            <>
              <div className="text-destructive bg-destructive/10 inline-flex items-center gap-1 rounded-md p-3 text-sm">
                <CircleAlert />
                Найдена аномалия распознавания! Активирован режим ручного пересчета инструментов. Для открытия сессии
                требуется подтверждение
              </div>
              <div className="inline-flex gap-1">
                <Checkbox
                  id="manual-returned-checkbox"
                  checked={isConfirmManual}
                  onCheckedChange={() => {
                    setIsConfirmManual((prev) => !prev)
                  }}
                />
                <Label htmlFor="manual-returned-checkbox">
                  Ручной пересчет выполнен, набор укомплектован согласно спецификации
                </Label>
              </div>
              <Button onClick={handleCloseSession} disabled={!isConfirmManual} className="ml-auto w-fit">
                Сдать инструменты
              </Button>
            </>
          )}
        </section>
      )}
    </div>
  )
}
const SessionPageRoute = createLazyRoute(ERouterPath.SESSION)({
  component: SessionPage,
})

export { SessionPageRoute }
