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

        const productRepository = new ProductRepository()

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


        const productRepository = new ProductRepository()

        await productRepository.create(product)


        product.changeName("product updated")
        product.changePrice(200)

        await productRepository.update(product)

        const productModel = await ProductModel.findOne({ where: { id: product.id } })

        console.table(productModel.toJSON())
        console.table(product)
        expect(productModel.toJSON()).toStrictEqual({
            id: product.id,
            name: product.name,
            price: product.price
        })
    })

    test('should find a product given id', async () => {
        const product = new Product("123", "product 1", 100)

        const productRepository = new ProductRepository()

        productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: { id: product.id } })

        const productFound = await productRepository.find(product.id)

        expect(productModel.toJSON()).toStrictEqual({
            id: productFound.id,
            name: productFound.name,
            price: productFound.price
        })
    })

    test("should find all products", async () => {
        const product = new Product("123", "product 1", 100)
        const product1 = new Product("1234", "product 2", 200)

        const productRepository = new ProductRepository()
        await productRepository.create(product)
        await productRepository.create(product1)

        const products = [product, product1]

        const productFound = await productRepository.findAll()

        expect(products).toEqual(productFound)
    })


    afterEach(async () => {
        await sequelize.close();
    })

})