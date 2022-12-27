import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/entity/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "./customer.model";
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

    test('should find a customer given id', async () => {
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

    test('should find all customers', async () => {
        const customer = new Customer("123", "customer 1", false)
        const customer1 = new Customer("124", "customer 2", false)
        const address = new Address("street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)
        customer1.changeAddress(address)

        const customerRepository = new CustomerRepository()
        await customerRepository.create(customer)
        await customerRepository.create(customer1)
        const customers = [customer, customer1]
        const customerModels = await CustomerModel.findAll()

        expect(customerModels.map(customer => customer.toJSON())).toEqual([{
            id: customer.id,
            name: customer.name,
            city: customer.address.city,
            zipcode: customer.address.zip,
            number: customer.address.number,
            street: customer.address.street,
            rewardPoints: customer.reward_point
        },
        {
            id: customer1.id,
            name: customer1.name,
            city: customer1.address.city,
            zipcode: customer1.address.zip,
            number: customer1.address.number,
            street: customer1.address.street,
            rewardPoints: customer1.reward_point
        }])
    })
    afterEach(async () => {
        sequelize.close()
    })
})