import Customer from "../../domain/entities/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";


export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        if (!entity) {
            throw new Error("Customer is required")
        }
        const customer = await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            rewardPoints: entity.reward_point
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            rewardPoints: entity.reward_point
        }, {
            where: {
                id: entity.id
            }
        })
    }
    find(id: string): Promise<Customer> {
        throw new Error("");

    }

    findAll(): Promise<Customer[]> {
        throw new Error("");
    }
}   