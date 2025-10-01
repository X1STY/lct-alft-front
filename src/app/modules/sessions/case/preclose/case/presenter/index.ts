import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useParams } from '@tanstack/react-router'

import type { IPreCloseSessionPort } from '@/domain/session/interface/port'

import { useModal } from '@/app/utils/hook/use-modal/core'
import { PreCloseSessionSchema } from '@/app/modules/sessions/case/preclose/validation'
import { usePreCloseSessionRequest } from '@/app/modules/sessions/case/preclose/case/request'
import { SESSION_PAGE_ROUTE } from '@/app/modules/sessions/route'

const usePreCloseSessionPresenter = () => {
  const { isOpen, toggleOpen, handleOnClose } = useModal()
  const { id } = useParams({ from: SESSION_PAGE_ROUTE.id })
  const form = useForm<IPreCloseSessionPort>({
    resolver: zodResolver(PreCloseSessionSchema),
    defaultValues: {
      image: undefined,
      id,
    },
  })

  const { mutateAsync, isPending } = usePreCloseSessionRequest()

  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data)
  })

  const toggleModalWithFormClear = (open: boolean) => {
    form.reset()
    toggleOpen(open)
  }

  return {
    form,
    handleSubmit,
    isPending,

    modalProps: {
      isOpen,
      toggleOpen: toggleModalWithFormClear,
      handleOnClose,
    },
  }
}

export { usePreCloseSessionPresenter }
