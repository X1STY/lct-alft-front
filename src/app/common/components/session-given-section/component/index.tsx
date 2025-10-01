import { useState } from 'react'
import { CircleAlert, Loader2Icon } from 'lucide-react'

import type { ISessionGivenSectionProps } from '@/app/common/components/session-given-section/interface'

import { Label } from '@/app/ui/components/label'
import { Checkbox } from '@/app/ui/components/checkbox'
import { ESessionStatus } from '@/domain/common/sessions/enum'
import { useOpenSessionPresenter } from '@/app/modules/sessions/case/open/presenter'
import { Button } from '@/app/ui/components/button'

const SessionGivenSection = ({ status, isError }: ISessionGivenSectionProps) => {
  const [isConfirmGivenManual, setIsConfirmGivenManual] = useState<boolean>(!isError)
  const { handleOpenSession, isPending } = useOpenSessionPresenter()

  return (
    <>
      {isError && status === ESessionStatus.OPEN_WAITING_FOR_APPROVAL && (
        <>
          <div className="text-destructive bg-destructive/10 inline-flex items-center gap-1 rounded-md p-3 text-sm">
            <CircleAlert />
            Найдена аномалия распознавания! Активирован режим ручного пересчета инструментов. Для открытия сессии
            требуется подтверждение
          </div>
          <div className="inline-flex gap-1">
            <Checkbox
              id="manual-given-checkbox"
              checked={isConfirmGivenManual}
              onCheckedChange={() => {
                setIsConfirmGivenManual((prev) => !prev)
              }}
            />
            <Label htmlFor="manual-given-checkbox">
              Ручной пересчет выполнен, набор укомплектован согласно спецификации
            </Label>
          </div>
        </>
      )}
      {status === ESessionStatus.OPEN_WAITING_FOR_APPROVAL && (
        <Button onClick={handleOpenSession} disabled={!isConfirmGivenManual || isPending} className="ml-auto w-fit">
          {isPending && <Loader2Icon className="animate-spin" />}
          Выдать инструменты
        </Button>
      )}
    </>
  )
}
export { SessionGivenSection }
