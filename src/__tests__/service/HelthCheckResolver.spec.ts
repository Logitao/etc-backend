import 'reflect-metadata'
import { HealthCheckResolver } from '../../services/HealthCheckResolver'

describe('health check resolver', () => {
  it('should return ok', async () => {
    const healthCheckResolver = new HealthCheckResolver()
    const actualResponse = await healthCheckResolver.healthCheck()
    const expectedResponse = 'OK'

    expect(actualResponse).toBe(expectedResponse)
  })
})
