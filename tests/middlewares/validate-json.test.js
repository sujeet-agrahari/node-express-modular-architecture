import { BadRequestError } from '../../src/utils/api-errors'
import validateJsonMiddleware from '../../src/middlewares/validate-json'

/**
 * Tests for validate-json middleware
 */
describe('validate-json middleware', () => {
  /**
   * Test to ensure BadRequestError is thrown if err is a SyntaxError with status 400 and body property
   */
  test('should throw BadRequestError if err is a SyntaxError with status 400 and body property', async () => {
    expect.assertions(2)
    const err = new SyntaxError('Invalid JSON')
    err.status = 400
    err.body = '{ "foo": "bar }'

    const req = {}
    const res = {}
    const next = jest.fn()

    try {
      await validateJsonMiddleware(err, req, res, next)
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeInstanceOf(BadRequestError)
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.message).toBe(err.message)
    }
  })

  /**
   * Test to ensure next is called if err is not a SyntaxError with status 400 and body property
   */
  test('should call next if err is not a SyntaxError with status 400 and body property', () => {
    expect.assertions(1)

    const err = new Error('Internal server error')
    err.status = 500
    err.body = '{ "foo": "bar" }'

    const req = {}
    const res = {}
    const next = jest.fn()

    validateJsonMiddleware(err, req, res, next)

    expect(next).toHaveBeenCalled()
  })
})
