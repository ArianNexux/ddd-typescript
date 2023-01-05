import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";


const product = ProductFactory.createWithUuid("p1", 10)
const product1 = ProductFactory.createWithUuid("p2", 10)



describe('Integrations test of list product use case', () => {

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
    test('should find all products', async () => {
        const productRepository = new ProductRepository()
        const usecase = new ListProductUseCase(productRepository)
        await productRepository.create(product)
        await productRepository.create(product1)
        const result = await usecase.execute({})
        const output = [
            {
                id: product.id,
                name: product.name,
                price: product.price
            },
            {
                id: product1.id,
                name: product1.name,
                price: product1.price
            }
        ]

        expect(result.products).toHaveLength(2)
        expect(result.products).toEqual(output)
    })

    afterAll(() => {
        sequelize.close();
    })
})

