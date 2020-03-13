import { Query, Resolver } from 'type-graphql'

@Resolver()
export class HealthCheckResolver {
  @Query(() => String)
  async healthCheck(): Promise<String> {
    return 'OK'
  }
}
