export default class OrderItem {


    constructor(
        private _id: string,
        private _name: string,
        private _price: number,
        private _productId: string,
        private _quantity: number
    ) {
        this.validate();

    }
    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price * this.quantity
    }

    get quantity(): number {
        return this._quantity;
    }

    get productId(): string {
        return this._productId;
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }
    changePrice(price: number) {
        this._price = price
        this.validate()
    }
    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }

        if (this._name.length === 0) {
            throw new Error("Name is required");
        }

        if (this._price <= 0) {
            throw new Error("Price must be greater than 0");
        }
        return true;
    }
}