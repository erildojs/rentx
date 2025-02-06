import { CreateCarController } from "@modules/cars/usecases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/usecases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/usecases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImageController } from "@modules/cars/usecases/uploadCarImage/UploadCarImageController";
import uploadConfig from '@config/multer'
import multer from "multer";


const carsRoutes = Router()
const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

const upload = multer(uploadConfig.upload('./tmp/cars'))

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)
carsRoutes.post('/images', ensureAuthenticated, ensureAdmin, upload.array('images'),  uploadCarImageController.handle)
carsRoutes.get('/available', listAvailableCarsController.handle)

export {carsRoutes}