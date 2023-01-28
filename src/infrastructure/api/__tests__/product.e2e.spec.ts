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

    it("should list all products", async () => {
        const product1 = {
            name: "p1",
            price: 100
        }

        const product2 = {
            name: "p2",
            price: 200
        }

        const createProduct1 = await request(app)
            .post('/products')
            .send(product1)

        const createProduct2 = await request(app)
            .post('/products')
            .send(product2)

        expect(createProduct1.status).toBe(200)
        expect(createProduct2.status).toBe(200)

        const responseListProduct1 = await request(app).
            get('/products').
            send()

        expect(responseListProduct1.status).toBe(200)
        expect(responseListProduct1.body.products[0].name).toBe(product1.name)
        expect(responseListProduct1.body.products[1].name).toBe(product2.name)
        expect(responseListProduct1.body.products[0].price).toBe(product1.price)
        expect(responseListProduct1.body.products[1].price).toBe(product2.price)

    })

    afterAll(async () => {
        await sequelize.close()
    })
})