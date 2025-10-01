import type { ESessionStatus } from '@/domain/common/sessions/enum'

interface ISessionGivenSectionProps {
  status: ESessionStatus
  isError: boolean
}

export type { ISessionGivenSectionProps }
