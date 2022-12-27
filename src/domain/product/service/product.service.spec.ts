import Product from "../entity/product"
import ProductService from "./product.service"

describe('Product service unit tests', () => {
    test('should change the prices of All products', () => {
        let product = new Product("123", "p1", 200)
        let product1 = new Product("1234", "p2", 400)
        let product2 = new Product("12345", "p3", 100)

        ProductService.increasePrice([product, product1, product2], 100);

        expect(product.price).toBe(400)
        expect(product1.price).toBe(800)
        expect(product2.price).toBe(200)

    })
})