import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory

describe('Send Forgot Mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        mailProvider = new MailProviderInMemory()
        dayjsDateProvider = new DayjsDateProvider()
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dayjsDateProvider,
            mailProvider
        )
    })

    it('should be able to send a forgot password mail to user', async () => {
        const sendMail = jest.spyOn(mailProvider, 'sendMail')
        await usersRepositoryInMemory.create({
            driver_license: 'wertfg56',
            email: 'testt@gmail.com',
            name: 'testt',
            password: '12345'
        })
        await sendForgotPasswordMailUseCase.execute('testt@gmail.com')
        expect(sendMail).toHaveBeenCalled()
    })

    it('should not be able to send an email if user does not exists', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('amir.gmail.com')
        ).rejects.toEqual(new AppError('User does not exist!'))
    })

    it('should be able to create an users token', async () => {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create')
        await usersRepositoryInMemory.create({
            driver_license: '23456',
            email: 'vdfrty@gmail.com',
            name: 'vdfrty',
            password: '12345'
        })
        await sendForgotPasswordMailUseCase.execute('vdfrty@gmail.com')
        expect(generateTokenMail).toHaveBeenCalled()
    })
})
SendForgotPasswordMailUseCase