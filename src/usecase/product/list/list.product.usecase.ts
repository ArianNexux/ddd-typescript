import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputListProductUseCaseDTO, OutputListProductUseCaseDTO } from "./list.product.dto";

export default class ListProductUseCase {
    constructor(private repository: ProductRepository) {

    }

    async execute(input: InputListProductUseCaseDTO): Promise<OutputListProductUseCaseDTO> {
        const products = await this.repository.findAll();

        const result = products.map(product => {
            return {
                id: product.id,
                name: product.name,
                price: product.price,
            }
        })

        return {
            products: result
        }
    }
}