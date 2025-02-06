import { CreateSpecificationController } from '@modules/cars/usecases/createSpecification/CreateSpecificationController'
import {Router} from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const specificationRoutes = Router()
const createSpecificationController = new CreateSpecificationController()
specificationRoutes.use(ensureAuthenticated)
specificationRoutes.post('/', createSpecificationController.handle)

export {specificationRoutes}