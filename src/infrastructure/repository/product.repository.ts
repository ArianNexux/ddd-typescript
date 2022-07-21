import { Model } from "sequelize-typescript";
import Product from "../../domain/entities/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        if (!entity) {
            throw new Error("Product is required")
        }
        const product = await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }

    async update(entity: Product): Promise<void> {
        if (!entity) {
            throw new Error("Product is required")
        }
        await ProductModel.update({
            name: entity.name,
            price: entity.price
        }, {
            where: {
                id: entity.id
            }
        });
    }
    async find(id: string): Promise<Product> {
        if (id === "") {
            throw new Error("Product is required");
        }
        const product = await ProductModel.findOne({
            where: {
                id: id
            }
        });

        return new Product(product.id, product.name, product.price);
    };


    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();
        return products.map((product) => (new Product(product.id, product.name, product.price)))
    }
}      