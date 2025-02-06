import { ResetPasswordUserController } from '@modules/accounts/usecases/resetPasswordUser/ResetPasswordUserController'
import { SendForgotPasswordController } from '@modules/accounts/usecases/sendForgotPasswordMail/SendForgotPasswordMailController'
import {Router} from 'express'

const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordController()
const resetPasswordUseCase = new ResetPasswordUserController()

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle)
passwordRoutes.post('/reset', resetPasswordUseCase.handle)

export {passwordRoutes}