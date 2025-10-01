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
import { useCreateSessionPresenter } from '@/app/modules/sessions/case/create/case/presenter'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/ui/components/form'
import { EmployeesSelect } from '@/app/modules/collections/employees/component'
import { KitsSelect } from '@/app/modules/collections/kits/component'
import { ImageUploader } from '@/app/ui/components/image-uploader'
import { LocationsSelect } from '@/app/modules/collections/locations/component'

export const NewSessionDialog = () => {
  const {
    form,
    handleSubmit,
    modalProps: { isOpen, toggleOpen },
    isPending,
  } = useCreateSessionPresenter()
  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <Form {...form}>
        <form onSubmit={handleSubmit} id="new-session-form">
          <DialogTrigger asChild>
            <Button>Выдать набор инструментов</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Открытие новой сессии</DialogTitle>
            </DialogHeader>
            <div className="grid gap-5">
              <FormField
                control={form.control}
                name="reciever_id"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Получатель</FormLabel>
                      <FormControl>
                        <EmployeesSelect
                          isRenderClearOption={false}
                          className="!w-full"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="kit_id"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Набор</FormLabel>
                      <FormControl>
                        <KitsSelect
                          isRenderClearOption={false}
                          className="!w-full"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="location_id"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Локация</FormLabel>
                      <FormControl>
                        <LocationsSelect
                          isRenderClearOption={false}
                          className="!w-full"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Изрображение инструментов с выдачи</FormLabel>
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
              <Button type="submit" form="new-session-form" disabled={isPending}>
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
