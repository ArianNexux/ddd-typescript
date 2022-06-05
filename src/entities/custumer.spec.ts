import Customer from './customer'

describe('Customer bussines rules', () => {

    it("should throw error on create a customer without id", () => {
        expect(() => {
            const customer = new Customer("", "Bento")
        }).toThrowError("Invalid id")
    })

    it("should throw error on create a customer without name", () => {
        expect(() => {
            const customer = new Customer("123", "")
        }).toThrowError("Invalid name")
    })

    it('should change name', () => {

        const costumer = new Customer("123", "Bento")

        costumer.changeName("Siala")

        expect(costumer.name).toBe("Siala")
    })

    it('should throw error on change name to empty', () => {
        expect(() => {
            const costumer = new Customer("123", "Bento")
            costumer.changeName("")
        }).toThrowError("Invalid name")
    })

    it('should activate customer', () => {
        const customer = new Customer("123", "Bento")

        customer.activate()

        expect(customer.isActive()).toBe(true)
    })

    it('should deactivate customer', () => {
        const customer = new Customer("123", "Bento")

        customer.deactivate()

        expect(customer.isActive()).toBe(false)
    })
})