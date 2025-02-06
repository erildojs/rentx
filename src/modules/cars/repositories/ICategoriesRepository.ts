import { Category } from "../infra/typeorm/entities/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  create({name, description}: ICreateCategoryDTO): Promise<void>
  findByName(name: string): Promise<Category | undefined>
  list(): Promise<Category[]>
}