import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entities/address";
import Customer from "../../domain/entities/customer";
import Order from "../../domain/entities/order";
import OrderItem from "../../domain/entities/order_item";
import Product from "../../domain/entities/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";


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
    test('should create an order', async () => {
        const customer = new Customer('134', 'John Doe');
        const address = new Address('1', 5265, 'Anytown', 'CA');
        customer.changeAddress(address);

        const product = new Product('1', 'Product 1', 10);
        const item1 = new OrderItem("123", "item1", 100, product.id, 2);
        const item2 = new OrderItem("321", "item2", 200, product.id, 3);
        const items = [item1, item2];
        const order = new Order('1', customer.id, items);

        const productRepository = new ProductRepository();
        const customerRepository = new CustomerRepository();
        const orderRepository = new OrderRepository();

        await productRepository.create(product)
        await customerRepository.create(customer)
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id
            },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: item1.id,
                    name: item1.name,
                    quantity: item1.quantity,
                    product_id: product.id,
                    price: item1.price,
                    order_id: order.id
                },
                {
                    id: item2.id,
                    name: item2.name,
                    quantity: item2.quantity,
                    price: item2.price,
                    product_id: product.id,
                    order_id: order.id
                }
            ]
        });
    })

    test('should update an order', async () => {
        const customer = new Customer('134', 'John Doe');
        const address = new Address('1', 5265, 'Anytown', 'CA');

        const product = new Product('1', 'Product 1', 10);
        const item1 = new OrderItem("123", "item1", 100, product.id, 2);
        const item2 = new OrderItem("321", "item2", 200, product.id, 3);
        const items = [item1, item2];
        const order = new Order('1', customer.id, items);

        const productRepository = new ProductRepository();
        const customerRepository = new CustomerRepository();
        const orderRepository = new OrderRepository();

        customer.changeAddress(address)

        await productRepository.create(product)
        await customerRepository.create(customer)
        await orderRepository.create(order)

        const newCustomer = new Customer('134', 'John Doe');
        order.changeCustomerId(newCustomer.id)
        const newItem = new OrderItem("1234", "item3", 100, product.id, 2);
        order.addOrderItem(newItem)
        await orderRepository.update(order)

        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id
            },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: newCustomer.id,
            total: order.total(),
            items: [
                {
                    id: item1.id,
                    name: item1.name,
                    quantity: item1.quantity,
                    product_id: product.id,
                    price: item1.price,
                    order_id: order.id
                },
                {
                    id: item2.id,
                    name: item2.name,
                    quantity: item2.quantity,
                    price: item2.price,
                    product_id: product.id,
                    order_id: order.id
                },
                {
                    id: newItem.id,
                    name: newItem.name,
                    quantity: newItem.quantity,
                    price: newItem.price,
                    product_id: product.id,
                    order_id: order.id
                }
            ]
        });
    })

    test("should find a record of order", async () => {
        const customer = new Customer('134', 'John Doe');
        const address = new Address('1', 5265, 'Anytown', 'CA');

        const product = new Product('1', 'Product 1', 10);
        const item1 = new OrderItem("123", "item1", 100, product.id, 2);
        const item2 = new OrderItem("321", "item2", 200, product.id, 3);
        const items = [item1, item2];
        const order = new Order('1', customer.id, items);

        const productRepository = new ProductRepository();
        const customerRepository = new CustomerRepository();
        const orderRepository = new OrderRepository();

        customer.changeAddress(address)

        await productRepository.create(product)
        await customerRepository.create(customer)
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id
            },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: item1.id,
                    name: item1.name,
                    quantity: item1.quantity,
                    product_id: product.id,
                    price: item1.price,
                    order_id: order.id
                },
                {
                    id: item2.id,
                    name: item2.name,
                    quantity: item2.quantity,
                    price: item2.price,
                    product_id: product.id,
                    order_id: order.id
                }
            ]
        });
    })

    test("should find all records of order", async () => {
        const customer = new Customer('134', 'John Doe');
        const address = new Address('1', 5265, 'Anytown', 'CA');
        const product = new Product('1', 'Product 1', 10);
        const item1 = new OrderItem("123", "item1", 100, product.id, 2);
        const item2 = new OrderItem("321", "item2", 200, product.id, 3);

        const order = new Order('1', customer.id, [item1]);
        const order1 = new Order('2', customer.id, [item2]);

        const productRepository = new ProductRepository();
        const customerRepository = new CustomerRepository();
        const orderRepository = new OrderRepository();

        customer.changeAddress(address)

        await productRepository.create(product)
        await customerRepository.create(customer)
        await orderRepository.create(order)
        await orderRepository.create(order1)

        const orderModel = await OrderModel.findAll({
            include: ["items"]
        })

        expect(orderModel.length).toBe(2);

        const orders = orderModel.map(order => order.toJSON())

        expect(orders).toStrictEqual([
            {
                id: order.id,
                customer_id: customer.id,
                total: order.total(),
                items: [
                    {
                        id: item1.id,
                        name: item1.name,
                        quantity: item1.quantity,
                        product_id: product.id,
                        price: item1.price,
                        order_id: order.id
                    }
                ]
            },
            {
                id: order1.id,
                customer_id: customer.id,
                total: order1.total(),
                items: [
                    {
                        id: item2.id,
                        name: item2.name,
                        quantity: item2.quantity,
                        product_id: product.id,
                        price: item2.price,
                        order_id: order1.id
                    }
                ]
            }
        ]);



    })
    afterEach(async () => {
        await sequelize.close();
    })
})