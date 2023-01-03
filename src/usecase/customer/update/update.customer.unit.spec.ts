import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("John", new Address("street", 10, "zip", "123456789"))

const input = {
    id: customer.id,
    name: "John updated",
    address: {
        street: "street updated",
        number: 11,
        zip: "zip updated",
        city: "city updated",
    }
}

const MockRepository = () => {
    return {
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn()
    }
}

describe('Unit test for customer update', () => {
    test('should update costumer', async () => {
        const customerRepository = MockRepository()

        const customerUseCase = new UpdateCustomerUseCase(customerRepository)

        const result = await customerUseCase.execute(input)

        expect(result).toEqual(input)

    })

    test('should thrown an error when customer not found', async () => {

        const customerRepository = MockRepository()
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer is required");
        })
        const customerUseCase = new UpdateCustomerUseCase(customerRepository)

        expect(async () => {
            const result = await customerUseCase.execute(input)
        }).rejects.toThrowError("Customer is required")
    })
})