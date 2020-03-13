require('dotenv').config()

import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import cors from 'cors'
import Express from 'express'
import axios from 'axios'

axios.defaults.baseURL = process.env.PROCON_URL

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
    }),
    debug: false
  })

  const app = Express()

  const frontendUrl = process.env.FRONTEND_URL
  const serverPort = process.env.SERVER_PORT || 4000

  app.use(
    cors({
      credentials: true,
      origin: frontendUrl || '*'
    })
  )

  apolloServer.applyMiddleware({ app })

  app.listen(serverPort, () =>
    console.log(`Server started http://0.0.0.0:${serverPort}/graphql`)
  )
}

main()
