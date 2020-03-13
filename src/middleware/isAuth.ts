import { MiddlewareFn } from 'type-graphql'
import { ApplicationContext } from '../other/typescript/ApplicationContext'

export const IsAuth: MiddlewareFn<ApplicationContext> = async (
  { context },
  next
) => {
  if (!context.request.headers!['X-Access-Token'])
    throw new Error('Not authenticated')
  return next()
}
