import EventInterface from "../../@shared/event.interface";

export default class CustomerChangeAddressEvent implements EventInterface {
    public dateTimeOcurred: Date;
    constructor(
        public eventData: any
    ) {
    }
}