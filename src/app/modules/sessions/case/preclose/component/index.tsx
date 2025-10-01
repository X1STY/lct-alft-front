import { Loader2Icon } from 'lucide-react'

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/ui/components/form'
import { ImageUploader } from '@/app/ui/components/image-uploader'
import { usePreCloseSessionPresenter } from '@/app/modules/sessions/case/preclose/case/presenter'

export const PreCloseSessionDialog = () => {
  const {
    form,
    handleSubmit,
    modalProps: { isOpen, toggleOpen },
    isPending,
  } = usePreCloseSessionPresenter()
  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <Form {...form}>
        <form onSubmit={handleSubmit} id="new-session-form">
          <DialogTrigger asChild>
            <Button>Сдать набор инструментов</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Сдать набор инструментов</DialogTitle>
            </DialogHeader>
            <div className="grid gap-5">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Изрображение инструментов с сдачи</FormLabel>
                      <FormControl>
                        <ImageUploader onChange={field.onChange} value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Отмена</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending} form="new-session-form">
                {isPending && <Loader2Icon className="animate-spin" />}
                Отправить на анализ
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  )
}
