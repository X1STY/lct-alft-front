import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import type { ICreateSessionPort } from '@/domain/session/interface/port'

import { CreateSessionSchema } from '@/app/modules/sessions/case/create/validation'
import { useCreateSessionRequest } from '@/app/modules/sessions/case/create/case/request'
import { useModal } from '@/app/utils/hook/use-modal/core'

const useCreateSessionPresenter = () => {
  const { isOpen, toggleOpen, handleOnClose } = useModal()

  const form = useForm<ICreateSessionPort>({
    resolver: zodResolver(CreateSessionSchema),
    defaultValues: {
      image: undefined,
      kit_id: undefined,
      reciever_id: undefined,
      location_id: undefined,
    },
  })

  const { mutateAsync, isPending } = useCreateSessionRequest()

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

export { useCreateSessionPresenter }
