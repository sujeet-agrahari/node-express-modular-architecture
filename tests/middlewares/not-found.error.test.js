import middleware from '../../src/middlewares/not-found-error'
import { NotFoundError } from '../../src/utils/api-errors'

/**
 * Tests for not-found-error middleware.
 */
describe('not-found-error middleware', () => {
  let req
  let res

  beforeEach(() => {
    req = {
      method: 'GET',
      url: '/api/v1/test'
    }
    res = {}
  })

  test('should throw NotFoundError with correct error message', async () => {
    expect.assertions(2)
    const expectedErrorMessage = `Not Found: ${req.method} on ${req.url}`

    try {
      await middleware(req, res)
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeInstanceOf(NotFoundError)
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.message).toBe(expectedErrorMessage)
    }
  })
})
