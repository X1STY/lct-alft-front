import type { IBaseResponse } from '@/domain/common/http/interface'

interface IEmployeeDto {
  id: string
  name: string
}

type IEmployeeCollectionDto = IBaseResponse<Array<IEmployeeDto>>

export type { IEmployeeDto, IEmployeeCollectionDto }
