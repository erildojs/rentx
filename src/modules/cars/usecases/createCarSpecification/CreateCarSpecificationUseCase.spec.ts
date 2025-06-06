import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { AppError } from "@shared/errors/AppError"
import { SpecificationsRepositoriesInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoriesInMemory"
import { afterAll, beforeAll, describe, expect, it, beforeEach } from "vitest"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoriesInMemory

describe('Create car specification', () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoriesInMemory
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
  })
  it('should not be able to add a new specification to an non-existent car', async () => {
    const car_id = '123'
    const specifications_id = ['54320']

    await expect(
      createCarSpecificationUseCase.execute({car_id, specifications_id})
    ).rejects.toEqual(new AppError('Car does not exists!'))
  })
  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
        description: 'description car',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category'
    })
    const specification = await specificationsRepositoryInMemory.create({
      name: 'test', description: 'test'
    })

    const specifications_id = [specification.id] as string[]
    const specificationsCars = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id})
    expect(specificationsCars).toHaveProperty('specifications')
    expect(specificationsCars.specifications.length).toBe(1)

  })
})