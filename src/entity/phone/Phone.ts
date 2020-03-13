import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export abstract class Phone {
  @Field()
  ddi: number

  @Field()
  ddd: number

  @Field()
  number: number
}

