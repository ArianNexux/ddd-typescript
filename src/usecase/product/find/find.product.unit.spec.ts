import Product from "../../../domain/product/entity/product"
import FindProductUseCase from "./find.product.usecase"

const product = new Product("123", "p1", 10)

const input = {
    id: "123"
}

const MockRepository = () => {
    return {
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn()
    }
}


describe("Unit test of product usecase", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository()

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