import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entities/address";
import Customer from "../../domain/entities/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe('Customer Repository', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    })

    test('should create a customer', async () => {
        const customer = new Customer("123", "customer 1", false)
        const address = new Address("street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)

        const customerRepository = new CustomerRepository()
        await customerRepository.create(customer)

        const customerModel = await CustomerModel.findOne({ where: { id: customer.id } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            city: customer.address.city,
            zipcode: customer.address.zip,
            number: customer.address.number,
            street: customer.address.street,
            rewardPoints: customer.reward_point
        })

    })

    test('should update a customer', async () => {
        const customer = new Customer("123", "customer 1", false)
        const address = new Address("street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)

        const customerRepository = new CustomerRepository()
        await customerRepository.create(customer)

        customer.changeName("customer updated")
        customer.addRewardPoint(200)

        await customerRepository.update(customer)

        const customerModel = await CustomerModel.findOne({ where: { id: customer.id } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            city: customer.address.city,
            zipcode: customer.address.zip,
            number: customer.address.number,
            street: customer.address.street,
            rewardPoints: customer.reward_point
        })
    })

    afterEach(async () => {
        sequelize.close()
    })
})