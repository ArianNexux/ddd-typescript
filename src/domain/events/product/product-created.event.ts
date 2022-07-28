import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface{
    public dateTimeOcurred: Date = new Date()
    constructor(
        public eventData: any
    ){

    }
}