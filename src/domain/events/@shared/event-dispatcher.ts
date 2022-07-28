import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";

export default class EventDispatcher implements EventDispatcherInterface{

    private eventHandlers: {[eventName: string]: EventHandlerInterface[]} = {}

    get getEventHandlers(): {[eventName: string]: EventHandlerInterface[]} {
        return this.eventHandlers
    }
    notify(event: EventInterface) {

    }

    register(eventName: String, eventHandler: EventHandlerInterface) {

    }

    unregister(eventName: String, eventHandler: EventHandlerInterface) {

    }

    unregisterAll() {

    }
}
