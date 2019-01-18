import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator'
import { User } from '../../../entity/user/User'

@ValidatorConstraint({ async: true })
export class EmailExistConstraint implements ValidatorConstraintInterface {
    validate(email: string, args: ValidationArguments) {
        return User.findOne({ where: { email } }).then(user => {
            return !user
        })
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
