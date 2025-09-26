import { useState } from 'react'

import type { IUseModalResult } from '@/app/utils/hook/use-modal/interface'

const useModal = (): IUseModalResult => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOnOpen: IUseModalResult['handleOnOpen'] = (callback) => {
    setIsOpen(true)
    callback?.()
  }

  const handleOnClose: IUseModalResult['handleOnClose'] = (callback) => {
    setIsOpen(false)
    callback?.()
  }

  const toggleOpen = (open: boolean) => {
    setIsOpen(open)
  }

  return { isOpen, handleOnOpen, handleOnClose, toggleOpen }
}

export { useModal }
