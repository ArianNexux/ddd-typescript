export default class Product {

    constructor(
        private _id: string,
        private _name: string,
        private _price: number
    ) {
        this.validate()
    }


    get name(): string {
        return this._name;
    }
    get price(): number {
        return this._price;
    }
    changeName(name: string) {
        this.validate()
        this._name = name;
    }

    changePrice(price: number) {
        this.validate()
        this._price = price;
    }

    validate(): boolean {
        if (this._id === "") {
            throw new Error("Id is required")
        }
        if (this._name === "") {
            throw new Error("Name is required")
        }
        if (this._price <= 0) {
            throw new Error("Invalid price provided")
        }

        return true;
    }


}