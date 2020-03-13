import { ApolloError } from 'apollo-server-express'

export interface IApplicationError {
  message: string
  error: string
  statusCode: number
  code?: string
}

export class ApplicationError extends ApolloError
  implements IApplicationError {
  message: string
  error: string
  statusCode: number
  code?: string

  constructor(config?: IApplicationError) {
    let defaultConfig = config

    if (typeof defaultConfig === 'undefined') {
      defaultConfig = {
        message: 'There was an unexpected internal server error',
        error: 'Internal Server error',
        statusCode: 500,
        code: 'INTERNAL_SERVER_ERROR'
      }
    }

    const { message, error, statusCode, code } = defaultConfig
    super(defaultConfig.message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApplicationError)
    }

    this.statusCode = statusCode
    this.code = code
    this.error = error
    this.message = message
  }
}
