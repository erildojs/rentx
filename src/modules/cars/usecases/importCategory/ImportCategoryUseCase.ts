import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import {parse} from 'csv-parse'
import fs from 'node:fs'
import { inject, injectable } from 'tsyringe';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File | undefined): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(String(file?.path))
    const categories: IImportCategory[] = []
    const parseFile = parse()
    stream.pipe(parseFile)
    parseFile.on("data", async (line) => {
      const [name, description] = line
      categories.push({name, description})
    }).on("end", () => {
      fs.promises.unlink(String(file?.path))//remove file
      resolve(categories)
    }).on("error", (err) => {
      reject(err)
    })
    })
  }

  async execute(file: Express.Multer.File | undefined): Promise<void> {
    const categories = await this.loadCategories(file)
    categories.map(async (category) => {
      const {name, description} = category
      const existCategory = await this.categoriesRepository.findByName(name)
      if(!existCategory) {
        await this.categoriesRepository.create({
          name,
          description
        })
      }
    })
  }
}