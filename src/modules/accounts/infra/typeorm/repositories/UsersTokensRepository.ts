import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokens } from "../entities/UsersTokens";
import { Repository, getRepository } from "typeorm";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UsersTokens>

    constructor() {
        this.repository = getRepository(UsersTokens)
    }

    async findByRefreshToken(refresh_token: string): Promise<UsersTokens | undefined> {
        const user_token = this.repository.findOne({refresh_token})
        return user_token
    }
    
    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens | undefined> {
        const usersTokens = await this.repository.findOne({
            user_id,
            refresh_token
        })
        return usersTokens
    }
    
    async create({ expires_date, refresh_token, user_id }: ICreateUsersTokensDTO): Promise<UsersTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        })
        await this.repository.save(userToken)
        return userToken
    }
    
}

export {UsersTokensRepository}