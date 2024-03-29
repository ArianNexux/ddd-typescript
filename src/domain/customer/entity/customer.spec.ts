import NotificationError from '../../@shared/notification/notification.error'
import Address from '../value-object/address'
import Customer from './customer'



describe('Address Value Objects', () => {
    test('should be able to create an address', () => {
        const address = new Address("Cacuaco", 123, "000", "Luanda")

        expect(address.street).toBe("Cacuaco")
        expect(address.number).toBe(123)
        expect(address.zip).toBe("000")
        expect(address.city).toBe("Luanda")
    })

    test('should thrown an error on invalid street', () => {
        expect(() => {
            const address = new Address("", 123, "000", "Luanda")
        }).toThrowError("Street is required")
    })

    test('should thrown an error on invalid number', () => {
        expect(() => {
            const address = new Address("Cacuaco", 0, "000", "Luanda")
        }).toThrowError("Number is required")
    })

    test('should thrown an error on invalid number', () => {
        expect(() => {
            const address = new Address("Cacuaco", 123, "", "Luanda")
        }).toThrowError("Zip is required")
    })

    test('should thrown an error on invalid city', () => {
        expect(() => {
            const address = new Address("Cacuaco", 123, "000", "")
        }).toThrowError("City is required")
    })
})

describe('Customer bussines rules', () => {

    test("should throw error on create a customer without id", () => {
        expect(() => {
            const customer = new Customer("", "Bento")
        }).toThrowError("customer: Id is required")
    })

    test("should throw error on create a customer without name", () => {
        expect(() => {
            const customer = new Customer("123", "")
        }).toThrowError("customer: Name is required")
    })

    test("should throw error on create a customer without id and name", () => {
        expect(() => {
            const customer = new Customer("", "")
        }).toThrowError("customer: Name is required, customer: Id is required")
    })

    test('should change name', () => {

        const costumer = new Customer("123", "Bento")

        costumer.changeName("Siala")

        expect(costumer.name).toBe("Siala")
    })

    test('should throw error on change name to empty', () => {
        expect(() => {
            const costumer = new Customer("123", "Bento")
            costumer.changeName("")
        }).toThrow(NotificationError)
    })

    test('should throw error when activate customer with undefined address', () => {
        expect(() => {
            const costumer = new Customer("123", "Bento")

            costumer.activate()

        }).toThrowError("Address is required")
    })

    test('should activate customer', () => {

        const customer = new Customer("123", "Bento")
        const address = new Address("Cacuaco", 123, "000", "Luanda")
        customer.changeAddress(address)
        customer.activate()

        expect(customer.isActive()).toBe(true)
    })

    test('should deactivate customer', () => {
        const customer = new Customer("123", "Bento")

        customer.deactivate()

        expect(customer.isActive()).toBe(false)
    })

    test('should set valid address to customer', () => {
        const address = new Address("Cacuaco", 123, "000", "Luanda")
        const customer = new Customer("123", "Bento", true)

        customer.changeAddress(address)

        expect(customer.address.city).toBe("Luanda")
        expect(customer.address.zip).toBe("000")
        expect(customer.address.number).toBe(123)
        expect(customer.address.street).toBe("Cacuaco")

    })

    test("should set reward point", () => {
        const customer = new Customer("c1", "customer1")
        customer.addRewardPoint(10)
        expect(customer.reward_point).toBe(10)
    })


})
