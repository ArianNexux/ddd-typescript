import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface{

    constructor(
        public dateTimeOcurred: Date = new Date(),
        public eventData: any
    ){

    }
}