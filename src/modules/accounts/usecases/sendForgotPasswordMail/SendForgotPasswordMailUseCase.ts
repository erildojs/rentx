import {v4 as uuidV4} from 'uuid'
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IMailerProvider } from '@shared/container/providers/MailProvider/IMailerProvider';
import {resolve} from 'path'

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
        @inject('DayjsDateProvider')
        private dayjsDateProvider: IDateProvider,
        @inject('EtherealMailProvider')
        private mailProvider: IMailerProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email)
        const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs')
        if(!user) throw new AppError('User does not exist!')
        const token = uuidV4()
        const expires_date = this.dayjsDateProvider.addHours(3)
        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id as string,
            expires_date
        })
        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }
        await this.mailProvider.sendMail(email, 'Recuperacao de Senha', variables, templatePath)
    }
}

export {SendForgotPasswordMailUseCase}