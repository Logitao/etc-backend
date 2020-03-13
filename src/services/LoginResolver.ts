import { Arg, Mutation, Resolver } from 'type-graphql'
import { User } from '../entity/user/User'
import Axios, { AxiosError } from 'axios'
import { ApplicationError } from '../other/typescript/ApplicationError'

// import * as bcrypt from 'bcryptjs'

@Resolver()
export class LoginResolver {
  @Mutation(() => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    try {
      const response = await Axios.post<User>('/users/login', {
        email,
        password
      })
      return response.data
    } catch (err) {
      if (typeof err.response === 'undefined') {
        throw new ApplicationError()
      } 
      throw new ApplicationError({
        ...err.response.data,
        code: 'RESOURCE_NOT_FOUND'
      })
    }
  }
}
