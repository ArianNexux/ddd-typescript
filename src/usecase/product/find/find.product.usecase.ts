import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputFindProductUseCaseDTO } from "./find.product.dto";

export default class FindProductUseCase {
    constructor(private repository: ProductRepository) {
    }

    async execute(input: InputFindProductUseCaseDTO) {
        const result = await this.repository.find(input.id);


        return {
            id: result.id,
            name: result.name,
            price: result.price,
        }

    }
}