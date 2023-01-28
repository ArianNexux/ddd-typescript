import { app, sequelize } from '../express'
import request from 'supertest'
describe('E2E test for customer', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })


    it("should create customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Bento",
                address: {
                    city: "Luanda",
                    number: 123,
                    zip: "12435",
                    street: "Cacuaco"
                }
            })

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Bento")
        expect(response.body.address.street).toBe("Cacuaco")
        expect(response.body.address.zip).toBe("12435")
        expect(response.body.address.number).toBe(123)
    })

    it("should not create a customer and return 500", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Bento"
            })

        expect(response.status).toBe(500)
    })

    afterAll(async () => {
        await sequelize.close();
    })
})