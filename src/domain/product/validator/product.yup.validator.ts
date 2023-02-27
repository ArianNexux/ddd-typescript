import ValidatorInterface from '../../@shared/validator/validator.interface';
import Product from '../entity/product';
import * as yup from 'yup';
import NotificationError from '../../@shared/notification/notification.error';

export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(entity: Product): void {
        try {
            yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                price: yup.number().positive("Invalid price provided").required("Invalid price provided"),
            }).validateSync({
                id: entity.getId(),
                name: entity.name,
                price: entity.getPrice()
            }, {
                abortEarly: false
            })

        } catch (err) {
            const e = err as yup.ValidationError;
            e.errors.forEach((err) => {
                entity.getNotification().addError({
                    message: err,
                    context: "product"
                })
            })
        }

    }
}