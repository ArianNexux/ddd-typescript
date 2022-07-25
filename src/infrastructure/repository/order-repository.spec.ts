import { Sequelize } from "sequelize-typescript"
import Customer from "../../domain/entities/customer";
import Order from "../../domain/entities/order";
import OrderItem from "../../domain/entities/order_item";
import Product from "../../domain/entities/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import OrderRepository from "./order.repository";


describe('Order Aggregate', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([OrderModel, OrderItemModel, ProductModel, CustomerModel]);
        await sequelize.sync();
    })
    test('should create an order', () => {
        const customer = new Customer('1', 'John Doe');
        const product = new Product('1', 'Product 1', 10);
        const item1 = new OrderItem("123", "item1", 100, product.id, 2);
        const item2 = new OrderItem("321", "item2", 200, product.id, 3);
        const items = [item1, item2];
        const order = new Order('1', customer.id, items);

        const orderRepository = new OrderRepository();
    })

    afterEach(async () => {
        await sequelize.close();
    })
})