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


    it("should list all customers", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Bento",
                address: {
                    city: "Luanda",
                    number: 123,
                    zip: "12435",
                    street: "Cacuaco"
                },
                rewardPoints: 10

            })
        expect(response.status).toBe(200)
        const response2 = await request(app)
            .post("/customers")
            .send({
                name: "John",
                address: {
                    city: "New York",
                    number: 123,
                    zip: "12423",
                    street: "San Francisco"
                }
            })
        expect(response2.status).toBe(200)

        const responseListCustomer = await request(app)
            .get("/customers")
            .send()

        expect(responseListCustomer.status).toBe(200)
        expect(responseListCustomer.body.customers.length).toBe(2)
        expect(responseListCustomer.body.customers[0].name).toBe("Bento")
        expect(responseListCustomer.body.customers[1].name).toBe("John")
        expect(responseListCustomer.body.customers[1].address.street).toBe("San Francisco")
        expect(responseListCustomer.body.customers[0].address.street).toBe("Cacuaco")

    })

    afterAll(async () => {
        await sequelize.close();
    })
})