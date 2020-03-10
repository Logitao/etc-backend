require('dotenv').config()

import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import Express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

const bootstrap = async (): Promise<any> => {
  try {
    const extension = process.env.NODE_ENV === 'production' ? 'js' : 'ts'
    const fullPath = `/services/*.${extension}`

    return await buildSchema({
      resolvers: [__dirname + fullPath]
    })
  } catch (error) {
    console.log(error)
  }
}

const main = async () => {
  const schema = await bootstrap()

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      request: req,
      response: res
    })
  })

  const app = Express()

  const frontendPort = process.env.FRONTEND_PORT || 3000
  const serverPort = process.env.SERVER_PORT || 4000

  app.use(cors({
    credentials: true,
    origin: ['*']
  }))

  apolloServer.applyMiddleware({ app })

  app.listen(serverPort, () =>
    console.log(`Server started http://0.0.0.0:${serverPort}/graphql`)
  )
}

main()
