import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputUpdateCustomerDTO } from "../../customer/update/update.customer.dto";
import { InputUpdateProductUseCaseDTO, OutputUpdateProductUseCaseDTO } from "./update.product.dto";

export default class UpdateProductUseCase {
    constructor(private repository: ProductRepository) {
    }

    async execute(input: InputUpdateProductUseCaseDTO): Promise<OutputUpdateProductUseCaseDTO> {

        const product = await this.repository.find(input.id);

        if (!product) {
            throw new Error("Product not found");
        }

        product.changeName(input.name);
        product.changePrice(input.price);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }

    }
}