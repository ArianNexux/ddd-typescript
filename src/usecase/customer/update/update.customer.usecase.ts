import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDTO, OutputUpdateCustomerDTO } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    constructor(
        private repository: CustomerRepositoryInterface
    ) {

    }

    async execute(input: InputUpdateCustomerDTO): Promise<OutputUpdateCustomerDTO> {

        const customer = await this.repository.find(input.id)

        customer.changeName(input.name)
        customer.changeAddress(new Address(
            input.address.street,
            input.address.number,
            input.address.zip,
            input.address.city
        ))

        await this.repository.update(customer)

        return {
            id: customer.id,
            name: customer.name,
            address: {
                zip: customer.address.zip,
                street: customer.address.street,
                number: customer.address.number,
                city: customer.address.city
            }
        }
    }
}