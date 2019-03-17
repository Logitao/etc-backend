import { Arg, Mutation, Resolver, Query, UseMiddleware } from 'type-graphql'
import * as bcrypt from 'bcryptjs'
import { User } from '../entity/user/User'
import { RegisterInput } from '../input/RegisterInput'
import { IsAuth } from '../middleware/isAuth'

@Resolver()
export class RegisterResolver {
    @Query(() => String)
    @UseMiddleware(IsAuth)
    hello() {
        return 'Hello'
    }
    @Mutation(() => User)
    async resgister(@Arg('data') data: RegisterInput): Promise<User | null> {
        const findUser = await User.findOne({ where: { email: data.email } })
        if (!findUser) {
            return await User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                password: await bcrypt.hash(data.password, 12),
                email: data.email
            }).save()
        }
        return null
    }
}
