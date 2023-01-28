import { Router, Request, Response } from 'express'
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';



export const productRoute = Router();


productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository())

    try {
        const output = await usecase.execute({
            name: req.body.name,
            price: req.body.price
        })

        res.status(200).send(output)

    } catch (err) {
        res.status(500).send(err.message)
    }
})