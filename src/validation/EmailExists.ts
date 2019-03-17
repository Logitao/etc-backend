import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator'
import { User } from '../entity/user/User'

@ValidatorConstraint({ async: true })
export class EmailExistConstraint implements ValidatorConstraintInterface {
    async validate(email: string, args: ValidationArguments) {
        const user = await User.findOne({ where: { email } })
        return Boolean(user)
    }
}

export function EmailExist(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: EmailExistConstraint
        })
    }
}
