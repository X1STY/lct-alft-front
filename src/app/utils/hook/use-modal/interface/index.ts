type IModalEventHandler = (callback?: () => void) => void

interface IUseModalResult {
  isOpen: boolean
  handleOnOpen: IModalEventHandler
  handleOnClose: IModalEventHandler
  toggleOpen: (open: boolean) => void
}

export type { IUseModalResult }
