import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoryControllerUseCase = container.resolve(ListCategoryUseCase)
    const categories = await listCategoryControllerUseCase.execute()
    return response.status(200).json(categories)
  }
}

export {ListCategoryController}