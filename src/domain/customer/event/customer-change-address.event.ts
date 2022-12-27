import EventInterface from "../../@shared/event/event.interface";

export default class CustomerChangeAddressEvent implements EventInterface {
    public dateTimeOcurred: Date;
    constructor(
        public eventData: any
    ) {
    }
}