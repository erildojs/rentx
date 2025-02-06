import { container } from "tsyringe"
import {Request, Response} from 'express'
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"


class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const {email, password} = request.body
    const authenticateUser = container.resolve(AuthenticateUserUseCase)
    const token = await authenticateUser.execute({
      email, password
    })
    return response.json(token)
  }
}

export {AuthenticateUserController}