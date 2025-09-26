import { Outlet } from '@tanstack/react-router'
import { Fragment } from 'react'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const BaseLayout = () => {
  return (
    <Fragment>
      <Outlet />

      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </Fragment>
  )
}

export { BaseLayout }
