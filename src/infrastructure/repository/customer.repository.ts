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

    update(entity: Customer): Promise<void> {
        throw new Error("");
    }
    find(id: string): Promise<Customer> {
        throw new Error("");

    }

    findAll(): Promise<Customer[]> {
        throw new Error("");
    }
}   