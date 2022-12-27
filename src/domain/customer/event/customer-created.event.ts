import EventInterface from "../../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    public dateTimeOcurred: Date = new Date()
    constructor(
        public eventData: any
    ) {

    }
}