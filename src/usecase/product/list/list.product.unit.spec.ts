import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";


const product = ProductFactory.createWithUuid("p1", 10)
const product1 = ProductFactory.createWithUuid("p2", 10)


const MockRepository = () => {
    return {
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue([product, product1]),
        create: jest.fn()
    }
}

describe('Unit test of list product use case', () => {
    test('should find all products', async () => {
        const repository = MockRepository()
        const usecase = new ListProductUseCase(repository)

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
})

