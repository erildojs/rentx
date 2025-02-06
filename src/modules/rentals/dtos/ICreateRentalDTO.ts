
interface ICreateRentalDTO {
  user_id: string
  car_id: string
  spected_return_date: Date
  id?: string
  end_date?: Date
  total?: number
}