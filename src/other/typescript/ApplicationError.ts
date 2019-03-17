import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class ApplicationError {
    @Field()
    message: string
}
