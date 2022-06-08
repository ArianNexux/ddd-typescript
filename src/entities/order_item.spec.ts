import OrderItem from "./order_item"

describe('Order item', () => {
    test('should throw error on id empty', () => {
        expect(() => {
            const order = new OrderItem("", "Item1", 100)
        }).toThrowError("Id is required")
    })

    test('should throw error on name empty', () => {
        expect(() => {
            const order = new OrderItem("123", "", 100)
        }).toThrowError("Name is required")
    })

    test('should throw error on price less than 0', () => {
        expect(() => {
            const order = new OrderItem("123", "Item1", -1)
        }).toThrowError("Price must be greater than 0")
    })

    test('should create an order item', () => {
        const order = new OrderItem("123", "Item1", 100)
        expect(order.id).toBe("123")
        expect(order.name).toBe("Item1")
        expect(order.price).toBe(100)
    })
})