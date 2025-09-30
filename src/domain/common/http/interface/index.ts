interface IBaseResponse<T> {
  items: T
  page_number: number
  page_size: number
}

export type { IBaseResponse }
