import { Sequelize } from 'sequelize-typescript';
import Product from '../../domain/entities/product';
import ProductModel from '../db/sequelize/model/product.model';
import ProductRepository from './product.repository';

describe('Product repository test', () => {

    let sequelize: Sequelize

    beforeEach(() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
    })
    test('should create a Product', async () => {
        const product = new Product("123", "product 1", 100)

        const model = new ProductModel(Sequelize)
        const productRepository = new ProductRepository(model)

        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: { id: product.id } })

        expect(productModel.toJSON()).toStrictEqual(product)

    })
    afterEach(async () => {
        await sequelize.close();
    })
})