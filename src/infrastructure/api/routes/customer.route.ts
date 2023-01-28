import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';


export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository())

    try {
        const customerDTO = {
            name: req.body.name,
            address: req.body.address
        }

        const result = await usecase.execute(customerDTO)

        res.status(200).send({
            name: result.name,
            address: result.address
        })

    } catch (err) {
        res.status(500).send(err.message)
    }

})