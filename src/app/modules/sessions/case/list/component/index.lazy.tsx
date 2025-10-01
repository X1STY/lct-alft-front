import { createLazyRoute } from '@tanstack/react-router'

import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Loader2Icon } from 'lucide-react'

import type { IGetSessionsPort } from '@/domain/session/interface/port'

import { GetSessionsPortSchema } from '@/app/modules/sessions/case/list/validation'
import { ERouterPath } from '@/domain/common/router/enum'
import { ESessionStatus } from '@/domain/common/sessions/enum'
import { useGetSessionListPresenter } from '@/app/modules/sessions/case/list/case/presenter'
import { Tabs, TabsList, TabsTrigger } from '@/app/ui/components/tabs'
import { DataTable } from '@/app/ui/components/data-table'
import { useSessionsColumns } from '@/app/modules/sessions/case/list/table/columns'
import { NewSessionDialog } from '@/app/modules/sessions/case/create/component'
import { EmployeesSelect } from '@/app/modules/collections/employees/component'
import { LocationsSelect } from '@/app/modules/collections/locations/component'

const SessionsListPage = () => {
  const filters = useForm<IGetSessionsPort>({
    resolver: zodResolver(GetSessionsPortSchema),
    defaultValues: { recieverId: '', locationId: '', status: ESessionStatus.OPENED },
  })

  const status = useWatch({ control: filters.control, name: 'status' })
  const locationId = useWatch({ control: filters.control, name: 'locationId' })
  const recieverId = useWatch({ control: filters.control, name: 'recieverId' })

  const { data, isPending } = useGetSessionListPresenter({ status, locationId, recieverId })
  const sessionsColumns = useSessionsColumns()
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-3xl font-semibold">Управление наборами инструментов</h2>
          <NewSessionDialog />
        </div>
        <div className="flex flex-row items-center justify-between">
          <Tabs
            value={status.toString()}
            onValueChange={(value) => {
              filters.setValue('status', value)
            }}>
            <TabsList>
              <TabsTrigger value={ESessionStatus.OPENED.toString()}>Открытые сессии</TabsTrigger>
              <TabsTrigger value={ESessionStatus.CLOSED.toString()}>Закрытые сессии</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-row items-center gap-4">
            <EmployeesSelect
              value={recieverId}
              onChange={(value) => {
                filters.setValue('recieverId', value)
              }}
            />
            <LocationsSelect
              value={locationId}
              onChange={(value) => {
                filters.setValue('locationId', value)
              }}
            />
          </div>
        </div>
      </section>
      <section>
        {isPending ? (
          <div className="size-full">
            <Loader2Icon className="m-auto h-10 w-10 animate-spin" />
          </div>
        ) : (
          <DataTable columns={sessionsColumns} isLoading={isPending} data={data?.items ?? []} />
        )}
      </section>
    </div>
  )
}

const SessionsListPageRoute = createLazyRoute(ERouterPath.SESSIONS)({
  component: SessionsListPage,
})

export { SessionsListPageRoute }
