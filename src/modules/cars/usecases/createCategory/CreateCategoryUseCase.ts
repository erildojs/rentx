import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {

  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  
  async execute({name, description}: IRequest): Promise<void> {
    const categoryAlreadExist = await this.categoriesRepository.findByName(name)
    if(categoryAlreadExist) {
      throw new AppError('category already exists!')
    }
    await this.categoriesRepository.create({name, description})
  }
}

export {CreateCategoryUseCase}