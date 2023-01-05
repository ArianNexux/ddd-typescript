import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./create.product.usecase";


const input = {
    name: "p1",
    price: 199
}

const MockRepository = () => {
    return {
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn()
    }
}

describe("Unit test create product use case", () => {
    test("should create a product", async () => {
        const createProductRepository = MockRepository();

        const usecase = new CreateProductUseCase(createProductRepository)

        const result = await usecase.execute(input);
        const output = {
            id: expect.any(String),
            ...result
        }
        expect(result).toEqual(output)
    })
})