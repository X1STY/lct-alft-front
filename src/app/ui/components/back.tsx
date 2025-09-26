import { Link, useCanGoBack, useRouter } from '@tanstack/react-router'

import { ArrowLeftIcon } from 'lucide-react'

import type { MouseEventHandler } from 'react'

const Back = () => {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  const handleOnBack: MouseEventHandler = (event) => {
    event.preventDefault()
    router.history.back()
    return false
  }

  return canGoBack ? (
    <Link className="back" to="" onClick={handleOnBack}>
      <ArrowLeftIcon />
      <span className="text-sm">Назад</span>
    </Link>
  ) : null
}

export default Back
