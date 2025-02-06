import { Router } from "express";
import multer from "multer";
import uploadConfig from '@config/multer'
import { CreateUserController } from "@modules/accounts/usecases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/usecases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router()
const createUserCotroller = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

usersRoutes.post('/', createUserCotroller.handle)
usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle)

export {usersRoutes}