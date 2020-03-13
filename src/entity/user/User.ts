import { ObjectType, Field, ID } from 'type-graphql'
import { Address } from '../address/Address'
import { Phone } from '../phone/Phone'
import { Document } from '../document/Document'

export enum Kinds {
  NaturalPerson = 'natural_person',
  LegalPerson = 'legal_person'
}

@ObjectType()
export abstract class User {
  @Field(() => ID)
  _id: string

  @Field()
  kind: Kinds

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field({ nullable: true })
  birthDate: Date

  @Field()
  email: string

  @Field(() => [Address])
  addresses: Address[]

  @Field(() => [Phone])
  phones: Phone[]

  @Field(() => [Document])
  documents: Document[]

  @Field()
  prefLang: 'en_US' | 'pt_BR'

  @Field(() => [String])
  alternateLangs: string[]

  @Field({ nullable: true })
  internalNote?: string

  @Field({ nullable: true })
  externalCode?: string

  @Field({ nullable: true })
  createdAt?: string

  @Field({ nullable: true })
  updatedAt?: string
}
