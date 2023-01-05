import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDTO, OutputListCustomerDTO } from "./list.customer.dto";

export default class ListCustomerUseCase {
    constructor(private customerRepository: CustomerRepositoryInterface) {
    }


    async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
        const customers = await this.customerRepository.findAll();

        const result = customers.map(e => {
            return {
                id: e.id,
                name: e.name,
                address: {
                    street: e.address.street,
                    city: e.address.city,
                    number: e.address.number,
                    zip: e.address.zip
                }
            }
        })

        return {
            customers: result
        }
    }
}