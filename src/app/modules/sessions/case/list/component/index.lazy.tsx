import { createLazyRoute } from '@tanstack/react-router'

import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { IGetSessionsPort } from '@/domain/session/interface/port'

import { GetSessionsPortSchema } from '@/app/modules/sessions/case/list/validation'
import { ERouterPath } from '@/domain/common/router/enum'
import { ESessionStatus } from '@/domain/common/sessions/enum'
import { useGetSessionListPresenter } from '@/app/modules/sessions/case/list/case/presenter'
import { Tabs, TabsList, TabsTrigger } from '@/app/ui/components/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/ui/components/select'
import { DataTable } from '@/app/ui/components/data-table'
import { sessionsColumns } from '@/app/modules/sessions/case/list/table/columns'
import { NewSessionDialog } from '@/app/common/components/new-session'

const SessionsListPage = () => {
  const filters = useForm<IGetSessionsPort>({
    resolver: zodResolver(GetSessionsPortSchema),
    defaultValues: { employeeId: '', kitId: '', status: ESessionStatus.OPENED },
  })

  const status = useWatch({ control: filters.control, name: 'status' })
  const kitId = useWatch({ control: filters.control, name: 'kitId' })
  const employeeId = useWatch({ control: filters.control, name: 'employeeId' })

  const { data, isLoading } = useGetSessionListPresenter({ status, kitId, employeeId })
  console.log(data)
  return (
    <div className="flex flex-col gap-6 w-full">
      <section className="flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-semibold text-3xl">Управление наборами инструментов</h2>
          <NewSessionDialog />
        </div>
        <div className="flex flex-row items-center justify-between">
          <Tabs
            value={status.toString()}
            onValueChange={(value) => {
              filters.setValue('status', parseInt(value) as ESessionStatus)
            }}>
            <TabsList>
              <TabsTrigger value={ESessionStatus.OPENED.toString()}>Открытые сессии</TabsTrigger>
              <TabsTrigger value={ESessionStatus.CLOSED.toString()}>Закрытые сессии</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-row items-center gap-4">
            <Select
              value={employeeId}
              onValueChange={(value) => {
                filters.setValue('employeeId', value === 'all' ? '' : value)
              }}>
              <SelectTrigger className="w-[250px] bg-background">
                <SelectValue placeholder="Выберете сотрудника" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="all"
                  onClick={() => {
                    filters.setValue('employeeId', '')
                  }}>
                  Все сотрудники
                </SelectItem>
                <SelectItem value="emp001">Иванов И.И.</SelectItem>
                <SelectItem value="emp002">Петров П.П.</SelectItem>
                <SelectItem value="emp003">Сидоров С.С.</SelectItem>
                <SelectItem value="emp004">Козлов К.К.</SelectItem>
                <SelectItem value="emp005">Морозов М.М.</SelectItem>
                <SelectItem value="emp006">Волков В.В.</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={kitId}
              onValueChange={(value) => {
                filters.setValue('kitId', value === 'all' ? '' : value)
              }}>
              <SelectTrigger className="w-[250px] bg-background">
                <SelectValue placeholder="Выберете набор" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="all"
                  onClick={() => {
                    filters.setValue('kitId', '')
                  }}>
                  Все наборы
                </SelectItem>
                <SelectItem value="kit001">Набор инструментов №1</SelectItem>
                <SelectItem value="kit002">Набор инструментов №2</SelectItem>
                <SelectItem value="kit003">Набор инструментов №3</SelectItem>
                <SelectItem value="kit004">Набор инструментов №4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
      <section>
        <DataTable columns={sessionsColumns} isLoading={isLoading} data={data ?? []} />
      </section>
    </div>
  )
}

const SessionsListPageRoute = createLazyRoute(ERouterPath.SESSIONS)({
  component: SessionsListPage,
})

export { SessionsListPageRoute }
