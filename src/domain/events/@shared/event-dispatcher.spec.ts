import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import EventDispatcher from "./event-dispatcher";
import ProductCreatedEvent from "../product/product-created.event";

describe("Event Tests", ()=>{
    test("should register an event handler", ()=>{
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

    })

    test("should unregister an event", ()=>{
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0)
    })

    test("should unregister all events", ()=>{
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined()
    })

    test("should notify all event handlers", ()=>{
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        const spyHandler = jest.spyOn(eventHandler, "handle")
        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)
        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            price: 10.0,
            description: "such product",
        })
        eventDispatcher.notify(productCreatedEvent)

        expect(spyHandler).toHaveBeenCalled()
    })


})