import ProductFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update.product.usecase"


const product = ProductFactory.createWithUuid("p1", 10)

const input = {
    id: product.id,
    name: "p1 updated",
    price: 10
}

const MockRepository = () => {
    return {
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn()
    }
}


describe('Unit test to update product', () => {
    test('should update a product', async () => {
        const productRepository = MockRepository()

        const usecase = new UpdateProductUseCase(productRepository)

        const result = await usecase.execute(input)

        const output = {
            id: expect.any(String),
            name: "p1 updated",
            price: 10
        }

        expect(result).toEqual(output)

    })
})
