import { Button } from '@/app/ui/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/components/dialog'
import { Input } from '@/app/ui/components/input'
import { Label } from '@/app/ui/components/label'
import { useModal } from '@/app/utils/hook/use-modal/core'

export const NewSessionDialog = () => {
  const { isOpen, toggleOpen } = useModal()
  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>Выдать набор инструментов</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Открытие новой сессии</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
