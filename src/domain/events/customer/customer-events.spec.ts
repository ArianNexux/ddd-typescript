import EventDispatcher from "../@shared/event-dispatcher";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";
import Customer from "../../entities/customer";

describe("Customer Events", ()=>{
    test("should notify when customer is created", ()=>{
        const customer = new Customer("123", "Bento Julio")
        const customerIsCreated = new CustomerCreatedEvent(customer)
        const eventDispatcher = new EventDispatcher()

        const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler()
        const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler()

        const spyEnviaConsoleLog1Handler = jest.spyOn(enviaConsoleLog1Handler, "handle")
        const spyEnviaConsoleLog2Handler = jest.spyOn(enviaConsoleLog2Handler, "handle")

        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler)
        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler)

        eventDispatcher.notify(customerIsCreated)


        expect(spyEnviaConsoleLog1Handler).toHaveBeenCalled()
        expect(spyEnviaConsoleLog2Handler).toHaveBeenCalled()

    })

})
