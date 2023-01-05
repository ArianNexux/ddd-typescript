import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDTO } from "./create.customer.dto";
export default class CreateCustomerUseCase {
    constructor(
        private customerRepository: CustomerRepositoryInterface
    ) {

    }

    async execute(input: InputCreateCustomerDTO) {
        const customer = CustomerFactory.createWithAddress(input.name, new Address(input.address.street, input.address.number, input.address.zip, input.address.city));

        await this.customerRepository.create(customer)

        return {
            id: customer.id,
            name: input.name,
            address: {
                city: input.address.city,
                street: input.address.street,
                zip: input.address.zip,
                number: input.address.number,
            }
        }

    }
}