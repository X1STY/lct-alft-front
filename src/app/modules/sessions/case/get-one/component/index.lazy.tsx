import { createLazyRoute } from '@tanstack/react-router'

import { isNil } from 'es-toolkit'

import { ERouterPath } from '@/domain/common/router/enum'
import { useGetOneSessionPresenter } from '@/app/modules/sessions/case/get-one/case/presenter'
import { SessionHeader } from '@/app/common/components/session-header/component'
import { DataTable } from '@/app/ui/components/data-table'
import { useSessionToolsGivenColumns } from '@/app/modules/sessions/case/get-one/given-table/columns'
import { ESessionStatus } from '@/domain/common/sessions/enum'
import { PreCloseSessionDialog } from '@/app/modules/sessions/case/preclose/component'
import { SessionImage } from '@/app/common/components/session-image/component'
import { SessionGivenSection } from '@/app/common/components/session-given-section/component'
import { SessionReturnedSection } from '@/app/common/components/session-returned-section/component'
import { useSessionToolsReturnedColumns } from '@/app/modules/sessions/case/get-one/returned-table/columns'

const SessionPage = () => {
  const { data, isLoading } = useGetOneSessionPresenter()
  const sessionToolsGivenColumns = useSessionToolsGivenColumns()

  const sessionToolsReturnedColumns = useSessionToolsReturnedColumns()
  if (isNil(data)) return null

  const isGivenQuantityError = data.tools.some((item) => item.quantity_required !== item.quantity_given)

  const isReturnedQuantityError = data.tools.some((item) => item.quantity_required !== item.quantity_returned)

  return (
    <div className="flex flex-col gap-4">
      <SessionHeader session={data} />
      <section className="flex flex-col gap-2">
        <h2 className="text-md text-neutral-500 uppercase">Выдача инструментов</h2>
        <div className="grid grid-cols-[35%_65%] gap-4">
          <SessionImage imageUrl={data.given_image_url} />
          <DataTable columns={sessionToolsGivenColumns} isLoading={isLoading} data={data.tools} />
        </div>
        <SessionGivenSection status={data.status} isError={isGivenQuantityError} />
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
            <SessionImage imageUrl={data.returned_image_url} />
            <DataTable columns={sessionToolsReturnedColumns} isLoading={isLoading} data={data.tools} />
          </div>
          <SessionReturnedSection status={data.status} isError={isReturnedQuantityError} />
        </section>
      )}
    </div>
  )
}
const SessionPageRoute = createLazyRoute(ERouterPath.SESSION)({
  component: SessionPage,
})

export { SessionPageRoute }
