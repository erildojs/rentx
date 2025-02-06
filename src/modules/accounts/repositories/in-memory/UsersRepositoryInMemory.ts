import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUsersRepository } from "../IUsersRepository";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create({email, name, password, driver_license}: ICreateUsersDTO): Promise<void> {
    const user = new User()
    Object.assign(user, {
      email, name, password, driver_license
    })
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email)
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id)
  }

}

export {UsersRepositoryInMemory}