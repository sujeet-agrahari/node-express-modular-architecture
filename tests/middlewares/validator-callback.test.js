import validatorCallback from '../../src/middlewares/validator-callback'
import { BadRequestError } from '../../src/utils/api-errors'

/**
 * Tests for validator-callback middleware
 */
describe('validator-callback middleware', () => {
  let req
  let res
  let next
  let validator

  beforeEach(() => {
    req = {
      body: {},
      query: {},
      params: {}
    }
    res = {}
    next = jest.fn()
    validator = jest.fn().mockReturnValue({
      error: null,
      value: {}
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  /**
   * Test to ensure the validator is called with the correct httpRequest
   */
  test('should call validator with correct httpRequest', async () => {
    expect.assertions(1)

    await validatorCallback(validator)(req, res, next)

    expect(validator).toHaveBeenCalledWith({
      body: req.body,
      query: req.query,
      params: req.params
    })
  })

  /**
   * Test to ensure req.body is set with validated value and next is called
   */
  test('should set req.body with validated value and call next', async () => {
    expect.assertions(2)

    const validatedValue = { foo: 'bar' }
    validator.mockReturnValueOnce({
      error: null,
      value: validatedValue
    })

    await validatorCallback(validator)(req, res, next)

    expect(req.body).toEqual(validatedValue)
    expect(next).toHaveBeenCalled()
  })

  /**
   * Test to ensure BadRequestError is thrown if validator returns an error
   */
  test('should throw BadRequestError if validator returns an error', async () => {
    expect.assertions(2)

    const validationError = new Error('Validation error')
    validator.mockReturnValueOnce({
      error: validationError,
      value: null
    })

    try {
      await validatorCallback(validator)(req, res, next)
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeInstanceOf(BadRequestError)
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.message).toBe(validationError.message)
    }
  })
})
