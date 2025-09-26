import { Outlet } from '@tanstack/react-router'

import type { ReactNode } from 'react'

const ModuleLayout = (): ReactNode => {
  return (
    <div className="module-layout">
      <Outlet />
    </div>
  )
}

export { ModuleLayout }
