import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';


export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository())

    try {
        const customerDTO = {
            name: req.body.name,
            address: req.body.address,
            rewardPoints: req.body.rewardPoints
        }

        const output = await usecase.execute(customerDTO)

        res.status(200).send({
            name: output.name,
            address: output.address
        })

    } catch (err) {
        res.status(500).send(err.message)
    }

})

customerRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository())

    try {
        const output = await usecase.execute({})
        res.status(200).send(output)
    } catch (err) {
        res.status(500).send(err.message)
    }
})