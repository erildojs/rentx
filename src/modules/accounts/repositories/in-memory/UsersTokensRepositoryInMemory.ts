import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { UsersTokens } from "@modules/accounts/infra/typeorm/entities/UsersTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";
import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    usersTokens: UsersTokens[] = []

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens | undefined> {
        const userToken = this.usersTokens.find((userToken) => userToken.user_id === user_id && userToken.refresh_token === refresh_token)
        return userToken
        
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.usersTokens.find((userToken) => userToken.id)
        this.usersTokens.splice(this.usersTokens.indexOf(userToken!))
        
    }

    async findByRefreshToken(refresh_token: string): Promise<UsersTokens | undefined> {
        const userToken = this.usersTokens.find((userToken) => userToken.refresh_token === refresh_token)
        return userToken

    }

    async create({expires_date, refresh_token, user_id}: ICreateUsersTokensDTO): Promise<UsersTokens> {
        const userToken = new UsersTokens()
        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id
        })
        this.usersTokens.push(userToken)
        return userToken
    }
    
}

export {UsersTokensRepositoryInMemory}