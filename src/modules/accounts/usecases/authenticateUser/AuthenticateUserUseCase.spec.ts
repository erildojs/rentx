import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO"
import { AppError } from "@shared/errors/AppError"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dayjsDateProvider)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUsersDTO = {
      driver_license: '123',
      name: 'test',
      email: 'test@gmail.com',
      password: '12345',
    }
    await createUserUseCase.execute(user)
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })
    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate an non exist user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '12345',
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect!"))
  })

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUsersDTO = {
      driver_license: '123',
      name: 'user test error ',
      email: 'text@test.com',
      password: "12345",
    }
    await createUserUseCase.execute(user)
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect!"))
  })
}) 