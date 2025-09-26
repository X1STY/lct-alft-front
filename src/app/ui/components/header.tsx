import { Moon, Sun } from 'lucide-react'

import type { FC } from 'react'

import { Breadcrumbs } from '@/app/ui/components/breadcrumbs'
import Back from '@/app/ui/components/back'
import { Button } from '@/app/ui/components/button'
import { useTheme } from '@/app/common/providers/theme/provider'

const Header: FC = () => {
  const { toggleTheme, theme } = useTheme()

  return (
    <header className="bg-background px-[50px] py-2 border-b border-border flex w-full box-border flex-row justify-between items-center ">
      <div className="flex gap-4">
        <Back />
        <Breadcrumbs />
      </div>
      <Button size="icon" onClick={toggleTheme}>
        {theme === 'light' ? <Sun /> : <Moon />}
      </Button>
    </header>
  )
}

export { Header }
