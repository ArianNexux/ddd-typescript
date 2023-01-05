import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";


const customer = CustomerFactory.createWithAddress("John", new Address("street", 10, "zip", "123456789"))
const customer1 = CustomerFactory.createWithAddress("John 1", new Address("street1", 11, "zip1", "123456789"))

const MockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockImplementation(() => Promise.resolve([customer, customer1]))
    }
}


describe("Unit test list customer use case", () => {

    test('should list all customers', async () => {
        const customerRepository = MockRepository()

        const listCustomerUseCase = new ListCustomerUseCase(customerRepository)

        const result = await listCustomerUseCase.execute(customerRepository)
        const output = [
            {
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    zip: customer.address.zip,
                    city: customer.address.city
                }
            },
            {
                id: customer1.id,
                name: customer1.name,
                address: {
                    street: customer1.address.street,
                    number: customer1.address.number,
                    zip: customer1.address.zip,
                    city: customer1.address.city
                }
            }
        ]
        expect(result.customers.length).toBe(2)

        expect(result.customers).toEqual(output)
    })
})
