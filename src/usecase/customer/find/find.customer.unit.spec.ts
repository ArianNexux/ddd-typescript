import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer";

const customer = new Customer("123", "FC3.0")
customer.addRewardPoint(10)
const address = new Address("street", 123, "zip", "city")
customer.changeAddress(address)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}
describe("Unit Test Find Customer use case", () => {

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

    it("should find a customer", async () => {
        const customerRepository = MockRepository();

        await customerRepository.create(customer)

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "FC3.0",
            address: {
                street: "street",
                zip: "zip",
                city: "city",
                number: 123
            }
        }

        const result = await (new FindCustomerUseCase(customerRepository)).execute(input)
        expect(result).toEqual(output)
    })
    afterEach(async () => {
        await sequelize.close()
    })

})