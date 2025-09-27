interface IEmployeeDto {
  id: string
  name: string
}

type IEmployeeCollectionDto = Array<IEmployeeDto>

export type { IEmployeeDto, IEmployeeCollectionDto }
