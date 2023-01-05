import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputFindProductUseCaseDTO, OutputFindProductUseCaseDTO } from "./find.product.dto";

export default class FindProductUseCase {
    constructor(private repository: ProductRepository) {
    }

    async execute(input: InputFindProductUseCaseDTO): Promise<OutputFindProductUseCaseDTO> {
        const result = await this.repository.find(input.id);


        return {
            id: result.id,
            name: result.name,
            price: result.price,
        }

    }
}