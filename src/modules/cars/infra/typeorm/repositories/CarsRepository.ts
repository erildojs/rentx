import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";
import { Repository, getRepository } from "typeorm";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }
  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository.createQueryBuilder()
    .update()
    .set({available})
    .where("id = :id")
    .setParameters({id})
    .execute()
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne(id)
    return car
  }

  async create({name, brand, category_id, daily_rate, description, fine_amount, license_plate, specifications, id}: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      specifications,
      id
    })
    await this.repository.save(car)
    return car
  }
  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({license_plate})
    return car
  }
  async findAvailable(brand?: string | undefined, category_id?: string | undefined, name?: string | undefined): Promise<Car[]> {
    const carsQuery = this.repository.createQueryBuilder('c').
    where('available = :available', {available: true})
    if(brand) carsQuery.andWhere('brand = :brand', {brand})
    if(name) carsQuery.andWhere('name = :name', {name})
    if(category_id) carsQuery.andWhere('category_id = :category_id', {category_id})
    const cars = await carsQuery.getMany()
    return cars
  }

}