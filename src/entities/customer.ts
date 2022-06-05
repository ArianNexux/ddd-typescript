export default class Customer {

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

    public changeName(name: string) {
        this._name = name;
        this.validate()
    }
    public activate() {
        this._active = true;
    }

    public deactivate() {
        this._active = false;
    }

    public isActive(): boolean {
        return this._active;
    }

}