import { ObjectType, Field, ID, Root } from 'type-graphql'

@ObjectType()
export class User {
    @Field(() => ID)
    id: number

    @Field()
    password: string

    @Field()
    email: string

    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field()
    confirmed: boolean

    @Field()
    fullName(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`
    }
}
