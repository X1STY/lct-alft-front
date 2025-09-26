import { Outlet } from '@tanstack/react-router'

import type { ReactNode } from 'react'

import { Header } from '@/app/ui/components/header'

const ModuleLayout = (): ReactNode => {
  return (
    <div className="layout">
      <Header />
      <div className="module-layout">
        <Outlet />
      </div>
    </div>
  )
}

export { ModuleLayout }
