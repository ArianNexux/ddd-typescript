import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service"

describe('Order Unit tests', () => {

    test('should place an order', () => {

        let customer = new Customer("c1", "costumer1")
        let item = new OrderItem("i1", "item1", 10, "p1", 1)

        let order = OrderService.placeOrder(customer, [item])

        expect(customer.reward_point).toBe(5)
        expect(order.total()).toBe(10)

    })


    test('should thrown an error when no items are providedr', () => {

        let customer = new Customer("c1", "costumer1")
        expect(() => {
            let order = OrderService.placeOrder(customer, [])



        }).toThrowError("Items are required")

    })
    test('should get total of all orders', () => {
        let item = new OrderItem("i1", "item", 100, "p1", 2)
        let item1 = new OrderItem("i2", "item2", 200, "p3", 2)

        let order = new Order("o1", "c1", [item])
        let order1 = new Order("o2", "c2", [item1])

        expect(OrderService.calculateTotal([order, order1])).toBe(600)

    })


})
