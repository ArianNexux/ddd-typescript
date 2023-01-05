import Product from "../entity/product";

export default class ProductService {


    static increasePrice(products: Product[], percent: number) {
        return products.forEach((product) => {
            product.changePrice((product.price * percent) / 100 + product.price)
        })

    }
}