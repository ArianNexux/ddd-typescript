import EventDispatcher from "../@shared/event-dispatcher";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";
import Customer from "../../entities/customer";
import Address from "../../entities/address";
import CustomerChangeAddressEvent from "./customer-change-address.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Customer Events", ()=>{
    test("should notify when customer is created", ()=>{
        const customer = new Customer("123", "Bento Julio")
        const customerIsCreatedEvent = new CustomerCreatedEvent(customer)
        const eventDispatcher = new EventDispatcher()

        const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler()
        const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler()

        const spyEnviaConsoleLog1Handler = jest.spyOn(enviaConsoleLog1Handler, "handle")
        const spyEnviaConsoleLog2Handler = jest.spyOn(enviaConsoleLog2Handler, "handle")

        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler)
        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(enviaConsoleLog1Handler)
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(enviaConsoleLog2Handler)

        eventDispatcher.notify(customerIsCreatedEvent)


        expect(spyEnviaConsoleLog1Handler).toHaveBeenCalled()
        expect(spyEnviaConsoleLog2Handler).toHaveBeenCalled()

    })
    test("should notify when customer change address", ()=>{
        const customer = new Customer("123", "Bela Júlio")
        const address = new Address("Cacuaco", 123, "123", "Luanda")
        customer.changeAddress(address)

        const customerChangeAddressEvent = new CustomerChangeAddressEvent(customer)
        const eventDispatcher = new EventDispatcher()

        const enviaConsoleLogHandler = new EnviaConsoleLogHandler()

        const spyCustomerChangeAddressEvent = jest.spyOn(enviaConsoleLogHandler, "handle")
        eventDispatcher.register("CustomerChangeAddressEvent", enviaConsoleLogHandler)

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(enviaConsoleLogHandler)

        eventDispatcher.notify(customerChangeAddressEvent)

        expect(spyCustomerChangeAddressEvent).toHaveBeenCalled()

    })
})
