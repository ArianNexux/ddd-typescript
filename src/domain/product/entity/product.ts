import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory"
export default class Product extends Entity {

    constructor(
        id: string,
        private _name: string,
        private _price: number
    ) {
        super();
        this.id = id
        this.validate()

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
    getPrice(): number {
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

    validate() {
        ProductValidatorFactory.create().validate(this);
    }


}