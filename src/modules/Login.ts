import { Arg, Ctx, Mutation, Resolver, createUnionType } from 'type-graphql'
import { User } from '../entity/user/User'
import { ApplicationContext } from '../types/ApplicationContext'
import * as bcrypt from 'bcryptjs'
import { ApplicationError } from '../types/ApplicationError'
import { generateApplicationError } from '../services/ErrorService'

const UserErrorUnion = createUnionType({
    name: 'UserErrorUnion', // the name of the GraphQL union
    types: [User, ApplicationError] // array of object types classes
})

@Resolver(User)
export class LoginResolver {
    @Mutation(() => UserErrorUnion)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() context: ApplicationContext
    ): Promise<typeof UserErrorUnion> {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return generateApplicationError('Usuário ou senha incorretos')
        }

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
            return generateApplicationError('Usuário ou senha incorretos')
        }

        context.request.session!.userId = user.id
        return user
    }
}
