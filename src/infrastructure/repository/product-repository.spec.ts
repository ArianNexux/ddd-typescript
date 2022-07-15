import { Sequelize } from 'sequelize-typescript';
import Product from '../../domain/entities/product';
import ProductModel from '../db/sequelize/model/product.model';
import ProductRepository from './product.repository';

describe('Product repository test', () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })
    test('should create a Product', async () => {
        const product = new Product("123", "product 1", 100)

        const model = new ProductModel()
        const productRepository = new ProductRepository(model)

        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: { id: product.id } })
        console.table(productModel.toJSON())
        expect(productModel.toJSON()).toStrictEqual({
            id: product.id,
            name: product.name,
            price: product.price
        })

    })

    test('should update a product', async () => {
        const product = new Product("123", "product 1", 100)

        const model = new ProductModel()
        const productRepository = new ProductRepository(model)

        await productRepository.create(product)


        product.changeName("product updated")
        product.changePrice(200)

        await productRepository.update(product)

        const productModel = await ProductModel.findOne({ where: { id: product.id } })

        console.table(product)
        expect(productModel.toJSON()).toStrictEqual({
            id: product.id,
            name: product.name,
            price: product.price
        })
    })

    afterEach(async () => {
        await sequelize.close();
    })
})