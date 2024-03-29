import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default class OrderService {
    static calculateTotal(orders: Order[]) {
        return orders.reduce((acc, order) => (acc + order.total()), 0)
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0) {
            throw new Error("Items are required");
        }
        let order = new Order("c1", customer.name, items);
        customer.addRewardPoint((order.total() / 2))
        return order
    }
}