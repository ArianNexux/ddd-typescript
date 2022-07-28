import EventDispatcherInterface from "./event-dispatcher.interface";

export default class EventDispatcher implements EventDispatcherInterface{
    notify(event: EventInterface) {

    }

    register(eventName: String, eventHandler: EventHandlerInterface) {

    }

    unregister(eventName: String, eventHandler: EventHandlerInterface) {

    }

    unregisterAll() {

    }
}
