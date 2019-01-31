import { ApplicationError } from '../types/ApplicationError'

export const generateApplicationError = (message: string): ApplicationError => {
    const error = new ApplicationError()
    error.message = message
    return error
}
