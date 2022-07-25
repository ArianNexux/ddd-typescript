
import OrderRepository from "../../infrastructure/repository/order.repository";
import Order from "../entities/order";
import RepositoryInterface from "./repository-interface";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> { }