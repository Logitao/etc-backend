import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export abstract class Document {
  @Field()
  kind: string

  @Field()
  number: string

  @Field()
  issuer: string

  @Field()
  date: Date
}
