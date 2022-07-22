import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";

export default class OrderRepository implements OrderRepositoryInterface {
    create(entity: OrderRepository): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(entity: OrderRepository): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<OrderRepository> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<OrderRepository[]> {
        throw new Error("Method not implemented.");
    }

}