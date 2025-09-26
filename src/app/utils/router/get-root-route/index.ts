import { ERouterPath } from '@/domain/common/router/enum'

const getRootRoute = (pathname: string): ERouterPath => {
  const candidate = '/' + pathname.split('/')[1]
  if (Object.values(ERouterPath).includes(candidate as ERouterPath)) {
    return candidate as ERouterPath
  }
  throw new Error(`Unknown root route: ${candidate}`)
}

export { getRootRoute }
