import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export abstract class Address {
  @Field()
  street: string

  @Field()
  number: string

  @Field()
  zipCode: string

  @Field()
  neightborhood: string

  @Field()
  city: string

  @Field()
  country: string
}

