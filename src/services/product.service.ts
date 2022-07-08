import Product from "../entities/product";

export default class ProductService {


    static increasePrice(products: Product[], percent: number) {
        return products.forEach((product) => {
            product.changePrice((product.price * percent) / 100 + product.price)
        })

    }
}