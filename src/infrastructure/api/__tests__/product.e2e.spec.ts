import { app, sequelize } from '../express'
import request from 'supertest'

describe('End to End Tests for products', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
    })

    it("should create a product", async () => {
        const product = {
            name: "p1",
            price: 100
        }

        const createProduct = await request(app)
            .post('/products')
            .send(product)

        expect(createProduct.status).toBe(200)
        expect(createProduct.body.name).toBe("p1")
    })

    it("should return error 500 creating product", async () => {
        const product = {
            name: "p1"
        }

        const createProduct = await request(app)
            .post('/products')
            .send(product)

        expect(createProduct.status).toBe(500)
    })

    afterAll(async () => {
        await sequelize.close()
    })
})