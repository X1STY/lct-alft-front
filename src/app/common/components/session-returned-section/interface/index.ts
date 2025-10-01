import type { ESessionStatus } from '@/domain/common/sessions/enum'

interface ISessionReturnedSectionProps {
  status: ESessionStatus
  isError: boolean
}

export type { ISessionReturnedSectionProps }
