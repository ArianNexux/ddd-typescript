import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase"

const product = new Product("123", "p1", 10)
let sequelize: Sequelize;


beforeEach(async () => {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true }
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
})

const input = {
    id: "123"
}



describe("Integration test of product usecase", () => {
    it("should find a product", async () => {
        const productRepository = new ProductRepository()

        await productRepository.create(product)

        const usecase = new FindProductUseCase(productRepository)

        const result = await usecase.execute(input)
        const output = {
            id: "123",
            name: "p1",
            price: 10

        }
        expect(result).toEqual(output)
    })

})