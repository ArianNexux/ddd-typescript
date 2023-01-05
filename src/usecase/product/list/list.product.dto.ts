export interface InputListProductUseCaseDTO {

}

type Product = {
    id: string,
    name: string,
    price: number
}
export interface OutputListProductUseCaseDTO {
    products: Product[]
}