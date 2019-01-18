import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { buildSchema, formatArgumentValidationError } from 'type-graphql'
import { createConnection } from 'typeorm'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors'
import { redis } from './redis'
import { RegisterResolver } from './modules/Register'
//import { LoginResolver } from './modules/Login'

const main = async () => {
    try {
        const RedisStore = connectRedis(session)
        await createConnection()
        const schema = await buildSchema({
            resolvers: [RegisterResolver]
        })
        const apolloServer = new ApolloServer({
            schema,
            formatError: formatArgumentValidationError,
            context: ({ req }: any) => ({ req })
        })

        const app = Express()
        app.use(
            cors({
                credentials: true,
                origin: 'http://localhost:3000'
            })
        )
        app.use(
            session({
                store: new RedisStore({
                    client: redis as any
                }),
                name: 'qid',
                secret: 'S3CR37',
                resave: false,
                saveUninitialized: false,
                cookie: {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
                }
            })
        )

        apolloServer.applyMiddleware({ app })

        app.listen(4000, () =>
            console.log('Server started http://localhost:4000/graphql')
        )
    } catch (error) {
        console.log(error)
    }
}

main()
