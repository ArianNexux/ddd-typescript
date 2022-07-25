import Order from "../../domain/entities/order";
import OrderItem from "../../domain/entities/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    product_id: item.productId
                }
                )),
            },
            {
                include: [{ model: OrderItemModel }]
            })
    }
    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    product_id: item.productId
                })),
            },
            {
                where: {
                    id: entity.id
                }
            })
    }
    async find(id: string): Promise<Order> {
        try {
            const order = await OrderModel.findOne({
                where: {
                    id
                },
                include: [{ model: OrderItemModel }]
            })

            const orderItems = order.items.map(item => new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
            ))

            return new Order(order.id, order.customer_id, orderItems);

        }
        catch (e) {
            throw new Error("Order is required");
        }
    }
    findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }

}