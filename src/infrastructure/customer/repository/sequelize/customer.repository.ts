import Address from "../../domain/customer/entity/address";
import Customer from "../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer-repository.interface";
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

    async find(id: string): Promise<Customer> {
        let customerModel
        try {
            customerModel = await CustomerModel.findOne({ where: { id: id }, rejectOnEmpty: true })
        } catch (e) {
            throw new Error("Customer is required");
        }

        const customer = new Customer(customerModel.id, customerModel.name)
        const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city)
        customer.changeAddress(address)
        customer.addRewardPoint(customerModel.rewardPoints)

        return customer


    }

    async findAll(): Promise<Customer[]> {
        const customers = await CustomerModel.findAll()

        return customers.map(customer => {
            const customerEntity = new Customer(customer.id, customer.name)
            const address = new Address(customer.street, customer.number, customer.zipcode, customer.city)
            customerEntity.changeAddress(address)
            customerEntity.addRewardPoint(customer.rewardPoints)
            return customerEntity
        }
        )
    }
}   