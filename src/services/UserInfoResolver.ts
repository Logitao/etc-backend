import { Query, Resolver, Arg } from 'type-graphql'
import { User } from '../entity/user/User'
import Axios from 'axios'
import { ApplicationError } from '../other/typescript/ApplicationError'

@Resolver()
export class UserInfoResolver {
  @Query(() => User, { nullable: true })
  async userInfo(@Arg('id') id: string): Promise<User> {
    try {
      const response = await Axios.get<User>(`/users/${id}`)
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
