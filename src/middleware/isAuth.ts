import { MiddlewareFn } from 'type-graphql'
import { ApplicationContext } from '../other/typescript/ApplicationContext'

export const IsAuth: MiddlewareFn<ApplicationContext> = async (
    { context },
    next
) => {
    if (!context.request.session!.userId) throw new Error('Not authenticated')
    return next()
}
