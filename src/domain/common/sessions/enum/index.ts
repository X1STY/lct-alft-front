enum ESessionStatus {
  PENDING = 0,
  OPENED = 1,
  CLOSED = 2,
}

const SessionStatusName = {
  [ESessionStatus.PENDING]: 'Ожидает открытия',
  [ESessionStatus.OPENED]: 'Открыта',
  [ESessionStatus.CLOSED]: 'Закрыта',
}

export { ESessionStatus, SessionStatusName }
