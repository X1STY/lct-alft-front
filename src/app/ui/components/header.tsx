import { Moon, Sun } from 'lucide-react'

import { Link } from '@tanstack/react-router'

import type { FC } from 'react'

import { Breadcrumbs } from '@/app/ui/components/breadcrumbs'
import Back from '@/app/ui/components/back'
import { Button } from '@/app/ui/components/button'
import { useTheme } from '@/app/common/providers/theme/provider'
import { TEST_MANY_IMAGES_ROUTE } from '@/app/modules/test-many-images/route'
import { SESSION_LIST_PAGE_ROUTE } from '@/app/modules/sessions/route'

const Header: FC = () => {
  const { toggleTheme, theme } = useTheme()

  return (
    <header className="bg-custom-background border-border box-border flex w-full flex-row items-center justify-between border-b px-[50px] py-2">
      <div className="flex flex-row gap-4">
        <Back />
        <Breadcrumbs />
      </div>
      <nav className="flex flex-row gap-6">
        <Link className="hover:underline" to={SESSION_LIST_PAGE_ROUTE.to} replace>
          Эмулятор ТОиР
        </Link>
        <Link className="hover:underline" to={TEST_MANY_IMAGES_ROUTE.to} replace>
          Тест модели
        </Link>
      </nav>
      <Button size="icon" onClick={toggleTheme}>
        {theme === 'light' ? <Sun /> : <Moon />}
      </Button>
    </header>
  )
}

export { Header }
