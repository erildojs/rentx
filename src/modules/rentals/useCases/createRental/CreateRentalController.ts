import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {spected_return_date, car_id} = request.body
    const {id} = request.user
    const createRentalUseCase = container.resolve(CreateRentalUseCase)
    const rental = await createRentalUseCase.execute({
      spected_return_date, user_id: id, car_id
    })
    return response.status(201).json(rental)
  }
}

export {CreateRentalController}