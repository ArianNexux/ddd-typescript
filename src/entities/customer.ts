import Address from './address'
export default class Customer {

    private _address: Address

    constructor(
        private _id: string,
        private _name: string,
        private _active = true
    ) {
        this.validate()
    }

    validate() {
        if (this._name.length == 0) {
            throw new Error("Invalid name")
        }
        if (this._id.length == 0) {
            throw new Error("Invalid id")
        }
    }

    get name(): string {
        return this._name;
    }

    set address(address: Address) {
        this._address = address
    }

    get address(): Address {
        return this._address
    }
    public changeName(name: string) {
        this._name = name;
        this.validate()
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

}