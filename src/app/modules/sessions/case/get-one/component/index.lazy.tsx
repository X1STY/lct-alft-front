import { createLazyRoute } from '@tanstack/react-router'

import { isNil } from 'es-toolkit'

import { ERouterPath } from '@/domain/common/router/enum'
import { useGetOneSessionPresenter } from '@/app/modules/sessions/case/get-one/case/presenter'
import { SessionHeader } from '@/app/common/components/session-header/component'

const SessionPage = () => {
  const { data } = useGetOneSessionPresenter()

  if (isNil(data)) return null
  return (
    <div className="flex flex-col gap-4">
      <SessionHeader session={data} />
      <section className="flex flex-col gap-2">
        <h2 className="text-md text-neutral-500 uppercase">Выдача инструментов</h2>
        <div className="grid grid-cols-2 gap-4">
          <img src={data.given_image_url} alt="Фото выданных инструментов" />
        </div>
      </section>
    </div>
  )
}
const SessionPageRoute = createLazyRoute(ERouterPath.SESSION)({
  component: SessionPage,
})

export { SessionPageRoute }
