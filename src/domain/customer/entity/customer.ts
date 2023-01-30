import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import Address from '../value-object/address'
export default class Customer extends Entity {

    private _address: Address
    private _reward_point: number = 0;

    constructor(
        id: string,
        private _name: string,
        private _active = true
    ) {
        super();
        this.id = id;
        this.validate()

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    validate() {
        if (this._name.length == 0) {
            this.notification.addError({ context: "customer", message: "Name is required" })
        }
        if (this.id.length == 0) {
            this.notification.addError({ context: "customer", message: "Id is required" })
        }
    }

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address
    }

    get reward_point(): number {
        return this._reward_point;
    }

    public changeName(name: string) {
        this._name = name;
        this.validate()
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }
    public activate() {
        if (this._address === undefined) {
            throw new Error("Address is required");
        }
        this._active = true;
    }

    public deactivate() {
        this._active = false;
    }

    public isActive(): boolean {
        return this._active;
    }

    public changeAddress(address: Address) {
        this._address = address
    }
    public addRewardPoint(r: number) {
        this._reward_point += r;
    }

}