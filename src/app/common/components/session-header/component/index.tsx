import { format } from 'date-fns'

import { isNotNil } from 'es-toolkit'

import type { FC } from 'react'

import type { ISessionHeaderProps } from '@/app/common/components/session-header/interface'

import { Badge } from '@/app/ui/components/badge'
import { SessionStatusColor, SessionStatusName } from '@/domain/common/sessions/enum'
import { useCollectionsContext } from '@/app/common/providers/collections/context'

const SessionHeader: FC<ISessionHeaderProps> = ({ session }) => {
  const { employeesCollection, kitCollection, locationCollection } = useCollectionsContext()

  const reciever = employeesCollection.find((item) => item.id === session.reciever_id)
  const kit = kitCollection.find((item) => item.id === session.kit_id)
  const location = locationCollection.find((item) => item.id === session.location_id)

  return (
    <section className="bg-background flex flex-col gap-4 rounded-xl p-4">
      <div>Сессия №{session.id}</div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-neutral-500">Получатель</span>
            <div className="">{reciever?.name}</div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-neutral-500">Набор</span>
            <div className="">{kit?.name}</div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-neutral-500">Станция</span>
            <div className="">{location?.name}</div>
          </div>
          {isNotNil(session.created_at) && (
            <div className="flex flex-col gap-1">
              <span className="text-sm text-neutral-500">Дата создания</span>
              <div className="">{format(session.created_at, 'd MMMM, HH:mm')}</div>
            </div>
          )}
        </div>
        <Badge className={SessionStatusColor[session.status]}>{SessionStatusName[session.status]}</Badge>
      </div>
    </section>
  )
}

export { SessionHeader }
