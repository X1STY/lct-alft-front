enum ESessionStatus {
  OPEN_WAITING_FOR_APPROVAL = 'open_waiting_for_aproval',
  OPEN_APPROVED = 'open_approved',
  OPENED = 'opened',
  CLOSE_WAITING_FOR_APPROVAL = 'close_waiting_for_aproval',
  CLOSE_APPROVED = 'close_approved',
  CLOSED = 'closed',
}

const SessionStatusName = {
  [ESessionStatus.OPEN_WAITING_FOR_APPROVAL]: 'Ожидает одобрения для открытия',
  [ESessionStatus.OPEN_APPROVED]: 'Одобрена для открытия',
  [ESessionStatus.OPENED]: 'Открыта',
  [ESessionStatus.CLOSE_WAITING_FOR_APPROVAL]: 'Ожидает одобрения для закрытия',
  [ESessionStatus.CLOSE_APPROVED]: 'Одобрена для закрытия',
  [ESessionStatus.CLOSED]: 'Закрыта',
}

const SessionStatusColor = {
  [ESessionStatus.OPEN_WAITING_FOR_APPROVAL]: 'bg-sky-600 text-white',
  [ESessionStatus.OPEN_APPROVED]: 'bg-sky-600 text-white',
  [ESessionStatus.OPENED]: 'bg-green-300 text-black',
  [ESessionStatus.CLOSE_WAITING_FOR_APPROVAL]: 'bg-amber-500 text-white',
  [ESessionStatus.CLOSE_APPROVED]: 'bg-amber-500 text-white',
  [ESessionStatus.CLOSED]: 'bg-red-400 text-white',
}

export { ESessionStatus, SessionStatusName, SessionStatusColor }
