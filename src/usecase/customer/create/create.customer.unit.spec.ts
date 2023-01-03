import CreateCustomerUseCase from "./create.customer"

const input = {
    name: "FC3.0",
    address: {
        street: "street",
        number: 123,
        zip: "zip",
        city: "City"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test create customer use case', () => {
    test('should create a customer', async () => {
        const customerRepository = MockRepository()
        const output = {
            id: expect.any(String),
            ...input
        }

        const usecaseCreateCustomer = new CreateCustomerUseCase(customerRepository)
        const result = await usecaseCreateCustomer.execute(input)

        expect(output).toEqual(result)

    })

    test('should thrown an error when name is missing', async () => {
        const customerRepository = MockRepository()
        input.name = ""
        const output = {
            id: expect.any(String),
            ...input
        }

        const usecaseCreateCustomer = new CreateCustomerUseCase(customerRepository)
        await expect(usecaseCreateCustomer.execute(input)).rejects.toThrow("Invalid name")

    })
})