import ValidatorInterface from '../../@shared/validator/validator.interface';
import Customer from '../entity/customer';
import * as yup from 'yup';
import NotificationError from '../../@shared/notification/notification.error';

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            yup.object().shape({
                name: yup.string().required("Name is required"),
                id: yup.string().required("Id is required"),
            }).validateSync({
                name: entity.name,
                id: entity.getId()
            }, {
                abortEarly: false
            })

        } catch (err) {
            const e = err as yup.ValidationError;
            e.errors.forEach((err) => {
                entity.getNotification().addError({
                    message: err,
                    context: "customer"
                })
            })
        }

    }
}