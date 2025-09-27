enum ESessionStatus {
  OPEN_WAITING_FOR_APPROVAL = 'OPEN_WAITING_FOR_APPROVAL',
  OPEN_APPROVED = 'OPEN_APPROVED',
  OPENED = 'OPENED',
  CLOSE_WAITING_FOR_APPROVAL = 'CLOSE_WAITING_FOR_APPROVAL',
  CLOSE_APPROVED = 'CLOSE_APPROVED',
  CLOSED = 'CLOSED',
}

const SessionStatusName = {
  [ESessionStatus.OPEN_WAITING_FOR_APPROVAL]: 'Ожидает одобрения для открытия',
  [ESessionStatus.OPEN_APPROVED]: 'Одобрена для открытия',
  [ESessionStatus.OPENED]: 'Открыта',
  [ESessionStatus.CLOSE_WAITING_FOR_APPROVAL]: 'Ожидает одобрения для закрытия',
  [ESessionStatus.CLOSE_APPROVED]: 'Одобрена для закрытия',
  [ESessionStatus.CLOSED]: 'Закрыта',
}

export { ESessionStatus, SessionStatusName }
