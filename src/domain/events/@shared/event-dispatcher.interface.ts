import EventInterface from "./event.interface";
import EventHandlerInterface from "./event-handler.interface";

export default interface EventDispatcherInterface {
    notify(event: EventInterface):void
    register(eventName: String, eventHandler: EventHandlerInterface): void
    unregister(eventName: String, eventHandler: EventHandlerInterface)
    unregisterAll(): void
}