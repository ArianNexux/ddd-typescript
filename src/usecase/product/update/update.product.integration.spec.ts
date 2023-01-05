import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase"





describe('Integration test to update product', () => {

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

    test('should update a product', async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository)
        const product = ProductFactory.createWithUuid('p1', 100)

        await productRepository.create(product)

        const input = {
            id: product.id,
            name: "p1 updated",
            price: 10
        }

        const result = await usecase.execute(input)

        const output = {
            id: expect.any(String),
            name: "p1 updated",
            price: 10
        }

        expect(result).toEqual(output)

    })

    afterEach(async () => {
        await sequelize.close()
    })
})
