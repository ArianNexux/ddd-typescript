import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductUseCaseDTO, OutputCreateProductUseCaseDTO } from "./create.product.dto";

export default class CreateProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {

    }

    async execute(input: InputCreateProductUseCaseDTO): Promise<OutputCreateProductUseCaseDTO> {

        const product = ProductFactory.createWithUuid(input.name, input.price)

        await this.productRepository.create(product);


        return {
            id: product.id,
            name: product.name,
            price: product.price
        }

    }
}