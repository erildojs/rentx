import { CategoriesRepositoriesInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoriesInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"
import { AppError } from "@shared/errors/AppError"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoriesInMemory

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoriesInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  })

  it("should be able to create a new category", async () => {
    const category = {
      name: "category name test",
      description: "category description test"
    }
    await createCategoryUseCase.execute({ name: category.name, description: category.description })
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

    expect(categoryCreated).toHaveProperty("id")
  })

  it("should not be able to create a new category with the same name", async () => {
    const category = {
      name: "category name test",
      description: "category description test"
    }
    await createCategoryUseCase.execute({ name: category.name, description: category.description })

    await expect(
      createCategoryUseCase.execute({ name: category.name, description: category.description })
    ).rejects.toEqual(new AppError('category already exists!'))
  })
})