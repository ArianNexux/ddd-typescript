import Customer from "../entities/customer";
import Order from "../entities/order";
import OrderItem from "../entities/order_item";

export default class OrderService {
    static calculateTotal(orders: Order[]) {
        return orders.reduce((acc, order) => (acc + order.total()), 0)
    }

    static placeOrder(customer: Customer, items: OrderItem[]) {

    }
}