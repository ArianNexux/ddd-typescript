import { Model } from "sequelize-typescript";
import Product from "../../domain/entities/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";
import productModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    constructor(
        private model: ProductModel
    ) {

    }

    async create(entity: Product): Promise<void> {
        if (!entity) {
            throw new Error("Product is required")
        }
        const product = await this.model.create(entity);
    }

    async update(entity: Product): Promise<void> {
        if (!entity) {
            throw new Error("Product is required")
        }
        const product = await this.model.update(entity);
    }
    find(id: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
}      