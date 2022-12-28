import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputFindCustomerDTO, OutputCustomerDTO } from "./find.customer.dto";

export default class FindCustomerUseCase {
    constructor(
        private repository: CustomerRepositoryInterface
    ) {

    }


    async execute(input: InputFindCustomerDTO): Promise<OutputCustomerDTO> {
        const result = await this.repository.find(input.id)

        return {
            id: result.id,
            name: result.name,
            address: {
                street: result.address.street,
                zip: result.address.zip,
                city: result.address.city,
                number: result.address.number
            }

        }
    }
}