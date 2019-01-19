import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { User } from '../entity/user/User'
import { ApplicationContext } from '../types/ApplicationContext'
import * as bcrypt from 'bcryptjs'

@Resolver()
export class LoginResolver {
    @Mutation(() => User)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() context: ApplicationContext
    ): Promise<User | null> {
        const user = await User.findOne({ where: { email } })
        if (!user) return null

        const valid = bcrypt.compare(password, user.password)
        if (!valid) return null
        context.request.session!.userId = user.id
        return user
    }
}
