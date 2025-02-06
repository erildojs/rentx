import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

type IRequest = {
    id: string
    user_id: string
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute({id, user_id}: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id)
        const car = await this.carsRepository.findById(String(rental?.car_id))
        const minimum_daily = 1
        if(!rental) throw new AppError('Rental does not exist!')
        const dateNow = this.dateProvider.dateNow()
        let dayly = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        )
        if(dayly <= 0) dayly = minimum_daily
        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.spected_return_date
        )
        let total = 0
        if(delay > 0) {
            const calculate_fine = delay * Number(car?.fine_amount)
            total = calculate_fine
        }
        total += delay * Number(car?.daily_rate)
        rental.end_date = this.dateProvider.dateNow()
        rental.total = total
        await this.rentalsRepository.create(rental)
        await this.carsRepository.updateAvailable(String(car?.id), true)
        return rental
    }
}

export {DevolutionRentalUseCase}