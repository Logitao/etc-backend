import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import Express from 'express';
import session from 'express-session';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { redis } from './redis';


const connect = async () => {
    let retries = 5

    while (retries > 0)
        try {
            await createConnection()
            break
        } catch (error) {
            console.log(error)
            retries--
        }
    return 0
}
const bootstrap = async () => {
    try {
        return await buildSchema({
            resolvers: [__dirname + '/services/*.js']
        })
    } catch (error) {
        console.log(error)
        return undefined
    }
}

const main = async () => {
    await connect()
    const schema = await bootstrap()

    const RedisStore = connectRedis(session)

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: any) => ({
            request: req,
            response: res
        })
    })

    const app = Express()
    app.use(
        cors({
            credentials: true,
            origin: 'http://localhost:8000'
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
}

main()
