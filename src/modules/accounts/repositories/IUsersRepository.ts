import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO"
import { User } from "../infra/typeorm/entities/User"

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
}

export {IUsersRepository}