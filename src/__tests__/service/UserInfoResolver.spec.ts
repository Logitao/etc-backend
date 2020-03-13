import 'reflect-metadata'
import { UserInfoResolver } from '../../services/UserInfoResolver'
import { ApplicationError } from '../../other/typescript/ApplicationError'
import nock from 'nock'

describe('UserInfoResolver', () => {
  it('should throw not found error on wrong user id', async () => {
    const id = 'asd'

    nock('http://localhost')
      .get(`/users/${id}`)
      .reply(404, {
        statusCode: 404,
        error: 'Not Found',
        message: 'Not Found'
      })

    try {
      const userInfoResolver = new UserInfoResolver()
      await userInfoResolver.userInfo(id)
    } catch (err) {

      expect(err).toBeInstanceOf(ApplicationError)

      expect(err.statusCode).toBe(404)
      expect(err.code).toBe('RESOURCE_NOT_FOUND')
    }
  })
})
