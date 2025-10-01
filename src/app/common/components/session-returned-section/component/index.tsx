import { useState } from 'react'
import { CircleAlert, Loader2Icon } from 'lucide-react'

import type { ISessionReturnedSectionProps } from '@/app/common/components/session-returned-section/interface'

import { Label } from '@/app/ui/components/label'
import { Checkbox } from '@/app/ui/components/checkbox'
import { ESessionStatus } from '@/domain/common/sessions/enum'
import { Button } from '@/app/ui/components/button'
import { useCloseSessionPresenter } from '@/app/modules/sessions/case/close/presenter'

const SessionReturnedSection = ({ status, isError }: ISessionReturnedSectionProps) => {
  const [isConfirmReturnedManual, setIsConfirmReturnedManual] = useState<boolean>(!isError)
  const { handleCloseSession, isPending } = useCloseSessionPresenter()

  return (
    <>
      {isError && status === ESessionStatus.CLOSE_WAITING_FOR_APPROVAL && (
        <>
          <div className="text-destructive bg-destructive/10 inline-flex items-center gap-1 rounded-md p-3 text-sm">
            <CircleAlert />
            Найдена аномалия распознавания! Активирован режим ручного пересчета инструментов. Для открытия сессии
            требуется подтверждение
          </div>
          <div className="inline-flex gap-1">
            <Checkbox
              id="manual-returned-checkbox"
              checked={isConfirmReturnedManual}
              onCheckedChange={() => {
                setIsConfirmReturnedManual((prev) => !prev)
              }}
            />
            <Label htmlFor="manual-returned-checkbox">
              Ручной пересчет выполнен, набор укомплектован согласно спецификации
            </Label>
          </div>
        </>
      )}
      {status === ESessionStatus.CLOSE_WAITING_FOR_APPROVAL && (
        <Button onClick={handleCloseSession} disabled={!isConfirmReturnedManual || isPending} className="ml-auto w-fit">
          {isPending && <Loader2Icon className="animate-spin" />}
          Сдать инструменты
        </Button>
      )}
    </>
  )
}
export { SessionReturnedSection }
