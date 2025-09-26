import { Link, useMatches } from '@tanstack/react-router'

import { isNotNil } from 'es-toolkit'

import { useMemo } from 'react'

import type { FC } from 'react'

const Breadcrumbs: FC = () => {
  const matches = useMatches()

  const breadcrumbs = useMemo(
    () =>
      matches
        .filter(({ pathname, loaderData }) => !pathname.endsWith('/') && isNotNil(loaderData?.crumb))
        .map(({ pathname, loaderData }) => ({
          url: pathname,
          crumb: loaderData.crumb,
        })),
    [matches],
  )

  return (
    <nav aria-label="Breadcrumb" className="flex flex-row items-center gap-2">
      {breadcrumbs.map(({ url, crumb }, index) => {
        const isLast = index === breadcrumbs.length - 1

        return (
          <div key={url} className="flex flex-row items-center gap-2">
            {isLast ? (
              <div className="text-md font-semibold">{crumb}</div>
            ) : (
              <Link to={url} className="no-underline visited:text-inherit">
                <div className="text-md font-semibold">{crumb}</div>
              </Link>
            )}
            {!isLast && <div className="text-md font-semibold">/</div>}
          </div>
        )
      })}
    </nav>
  )
}

export { Breadcrumbs }
