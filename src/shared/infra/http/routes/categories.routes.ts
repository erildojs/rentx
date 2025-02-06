
import { CreateCategoryController } from '@modules/cars/usecases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/usecases/importCategory/ImportCategoryController'
import {Router} from 'express'
import multer from 'multer'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ListCategoryController } from '@modules/cars/usecases/listCategory/ListCategoryController'

const categoriesRoutes = Router()
const importCategoryController = new ImportCategoryController()
const createCategoryController = new CreateCategoryController()
const listCategoriesController = new ListCategoryController()

const upload = multer({
  dest: './uploads'
})

categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, createCategoryController.handle)
categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.post('/import', upload.single('file'), ensureAuthenticated, ensureAdmin, importCategoryController.handle)

export {categoriesRoutes}
