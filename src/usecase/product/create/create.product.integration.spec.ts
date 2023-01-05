import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";




describe("Integration test of create product", () => {
    let sequelize: Sequelize;

    const input = {
        name: "p1",
        price: 199
    }

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

    test("should create a product", async () => {
        const createProductRepository = new ProductRepository();

        const usecase = new CreateProductUseCase(createProductRepository)

        const result = await usecase.execute(input);

        const output = {
            id: expect.any(String),
            ...result
        }
        expect(result).toEqual(output)
    })

    afterEach(async () => {
        await sequelize.close()
    })
})