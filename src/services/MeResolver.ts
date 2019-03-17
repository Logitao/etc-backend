import { Ctx, Query, Resolver } from 'type-graphql'
import { User } from '../entity/user/User'
import { ApplicationContext } from '../other/typescript/ApplicationContext'

@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(
        @Ctx() context: ApplicationContext
    ): Promise<User | null | undefined> {
        if (!context.request.session!.userId) {
            return null
        }
        return await User.findOne({
            where: { id: context.request.session!.userId }
        })
    }
}
