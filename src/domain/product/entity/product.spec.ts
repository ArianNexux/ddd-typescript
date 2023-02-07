import Product from "./product"

describe('Product unit test', () => {
    test('should throw an error if no id is provided', () => {
        expect(() => {
            // let order = new Order("o1", "c1", [])

            let product = new Product("", "product 1", 100)

        }).toThrowError("product: Id is required")
    })

    test('should throw an error if price is less or equal then zero', () => {
        expect(() => {
            let product = new Product("123", "product 1", 0)
        }).toThrowError("product: Invalid price provided")

    })

    test('should throw an error if no name is provided', () => {
        expect(() => {
            let product = new Product("123", "", 10)
        }).toThrowError("product: Name is required")
    })

    test('should throw an error if no name, price and id was provided is provided', () => {
        expect(() => {
            let product = new Product("", "", 0)
        }).toThrowError("product: Id is required, product: Name is required, product: Invalid price provided")
    })


    test('should change name of the product', () => {
        let product = new Product("123", "p1", 100)
        product.changeName("p2")
        expect(product.name).toBe("p2")
    })

    test('should change the price of the product', () => {
        let product = new Product("123", "p1", 120)
        product.changePrice(200)
        expect(product.price).toBe(200)
    })
})