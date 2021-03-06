import { InputType, Field } from 'type-graphql'
import { IsEmail, MinLength } from 'class-validator'

@InputType()
export class RegisterInput {
    @Field() firstName: string
    @Field() lastName: string

    @Field()
    @MinLength(8, { message: 'Senha deve ser maior que 8 caractéres' })
    password: string

    @Field()
    @IsEmail(undefined, { message: 'Digite um email válido' })
    email: string
}
