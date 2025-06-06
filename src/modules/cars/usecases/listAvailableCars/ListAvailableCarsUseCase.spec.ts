import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"
import { afterAll, beforeAll, describe, expect, it, beforeEach } from "vitest"

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("list cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car1',
      description: 'car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'car_brand',
      category_id: 'category_id'
    })
    const cars = await listAvailableCarsUseCase.execute({})
    expect(cars).toEqual([car])
  })
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car2',
      description: 'car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'car_brand_test',
      category_id: 'category_id'
    })
    const cars = await listAvailableCarsUseCase.execute({brand: 'car_brand_test'})
    expect(cars).toEqual([car])
  })
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car3',
      description: 'car description',
      daily_rate: 110.0,
      license_plate: 'DEF-12345',
      fine_amount: 40,
      brand: 'car_brand_test',
      category_id: 'category_id'
    })
    const cars = await listAvailableCarsUseCase.execute({name: 'car3'})
    expect(cars).toEqual([car])
  })
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car2',
      description: 'car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'car_brand_test',
      category_id: '12345'
    })
    const cars = await listAvailableCarsUseCase.execute({category_id: '12345'})
    expect(cars).toEqual([car])
  })
})