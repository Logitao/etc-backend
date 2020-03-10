import { Ctx, Mutation, Resolver } from 'type-graphql'
import { ApplicationContext } from '../other/typescript/ApplicationContext'

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() context: ApplicationContext): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      context.request.session.destroy(error => {
        if (error) {
          console.log(error)
          reject(false)
        }
        context.response.clearCookie('qid')
        resolve(true)
      })
    })
  }
}
