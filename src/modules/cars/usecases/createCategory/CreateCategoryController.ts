import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { z } from "zod";


class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const creatCategoryBodySchema = z.object({
      name: z.string(),
      description: z.string()
    })
    const {name, description} = creatCategoryBodySchema.parse(request.body)
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
    await createCategoryUseCase.execute({name ,description})
    return response.status(201).send()
  }
}

export {CreateCategoryController}