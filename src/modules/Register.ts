import { Arg, Mutation, Resolver, Query } from 'type-graphql'
import * as bcrypt from 'bcryptjs'
import { User } from '../entity/user/User'
import { RegisterInput } from './register/RegisterInput'

@Resolver()
export class RegisterResolver {
    @Query(() => String)
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
