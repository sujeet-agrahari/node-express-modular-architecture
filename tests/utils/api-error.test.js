import {

  APIError,
  BadRequestError,
  AccessDeniedError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
  ConflictError,
  UnSupportedMediaTypeError,
  UnProcessableEntityError,
  InternalServerError
} from '../../src/utils/api-errors'

/**
 * Test suite for APIError class
 */
describe('APIError', () => {
  it('should create an instance of APIError', () => {
    expect.assertions(1)
    const error = new APIError(500, 'Internal Server Error')
    expect(error).toBeInstanceOf(APIError)
  })

  it('should have the correct status and message properties', () => {
    expect.assertions(2)
    const error = new APIError(500, 'Internal Server Error')
    expect(error.status).toBe(500)
    expect(error.message).toBe('Internal Server Error')
  })
})

/**
 * Test suite for BadRequestError class
 */
describe('BadRequestError', () => {
  it('should create an instance of BadRequestError', () => {
    expect.assertions(1)
    const error = new BadRequestError('Bad Request')
    expect(error).toBeInstanceOf(BadRequestError)
  })

  it('should have the correct status and message properties', () => {
    expect.assertions(2)
    const error = new BadRequestError('Bad Request')
    expect(error.status).toBe(400)
    expect(error.message).toBe('Bad Request')
  })
})

/**
 * Test suite for AccessDeniedError class
 */
describe('AccessDeniedError', () => {
  it('should create an instance of AccessDeniedError', () => {
    expect.assertions(1)
    const error = new AccessDeniedError('Access Denied')
    expect(error).toBeInstanceOf(AccessDeniedError)
  })

  it('should have the correct status and message properties', () => {
    expect.assertions(2)
    const error = new AccessDeniedError('Access Denied')
    expect(error.status).toBe(401)
    expect(error.message).toBe('Access Denied')
  })
})

/**
 * Test suite for UnauthorizedError class
 */
describe('UnauthorizedError', () => {
  it('should create an instance of UnauthorizedError', () => {
    expect.assertions(1)
    const error = new UnauthorizedError('Unauthorized')
    expect(error).toBeInstanceOf(UnauthorizedError)
  })

  it('should have the correct status and message properties', () => {
    expect.assertions(2)
    const error = new UnauthorizedError('Unauthorized')
    expect(error.status).toBe(403)
    expect(error.message).toBe('Unauthorized')
  })
})

/**
 * Test suite for ForbiddenError class
 */
describe('ForbiddenError', () => {
  it('should create an instance of ForbiddenError', () => {
    expect.assertions(1)
    const error = new ForbiddenError('Forbidden')
    expect(error).toBeInstanceOf(ForbiddenError)
  })

  it('should have the correct status and message properties', () => {
    expect.assertions(2)
    const error = new ForbiddenError('Forbidden')
    expect(error.status).toBe(403)
    expect(error.message).toBe('Forbidden')
  })
})

/**
 * Test suite for NotFoundError class
 */
describe('NotFoundError', () => {
  it('should create an instance of NotFoundError', () => {
    expect.assertions(1)
    const error = new NotFoundError('Not Found')
    expect(error).toBeInstanceOf(NotFoundError)
  })

  it('should have the correct status and message properties', () => {
    expect.assertions(2)
    const error = new NotFoundError('Not Found')
    expect(error.status).toBe(404)
    expect(error.message).toBe('Not Found')
  })
})

/**
 * Test suite for MethodNotAllowedError class
 */
describe('MethodNotAllowedError', () => {
  it('should create an instance of MethodNotAllowedError', () => {
    expect.assertions(1)
    const error = new MethodNotAllowedError('Method Not Allowed')
    expect(error).toBeInstanceOf(MethodNotAllowedError)
  })

  it('should have the correct status and message properties', () => {
    expect.assertions(2)
    const error = new MethodNotAllowedError('Method Not Allowed')
    expect(error.status).toBe(405)
    expect(error.message).toBe('Method Not Allowed')
  })
})

/**
 * Test suite for ConflictError class
 */
describe('ConflictError', () => {
  it('should create an instance of ConflictError', () => {
    expect.assertions(1)
    const error = new ConflictError('Conflict')
    expect(error).toBeInstanceOf(ConflictError)
  })

  it('should have the correct status and message properties', () => {
    expect.assertions(2)
    const error = new ConflictError('Conflict')
    expect(error.status).toBe(408)
    expect(error.message).toBe('Conflict')
  })
})

/**
 * Test suite for UnSupportedMediaTypeError class
 */
describe('UnSupportedMediaTypeError', () => {
  it('should create an instance of UnSupportedMediaTypeError', () => {
    expect.assertions(1)
    const error = new UnSupportedMediaTypeError('Unsupported Media Type')
    expect(error).toBeInstanceOf(UnSupportedMediaTypeError)
  })

  it('should have the correct status and message properties', () => {
    expect.assertions(2)
    const error = new UnSupportedMediaTypeError('Unsupported Media Type')
    expect(error.status).toBe(415)
    expect(error.message).toBe('Unsupported Media Type')
  })
})

/**
 * Test suite for UnProcessableEntityError class
 */
describe('UnProcessableEntityError', () => {
  it('should create an instance of UnProcessableEntityError', () => {
    expect.assertions(1)
    const error = new UnProcessableEntityError('Unprocessable Entity')
    expect(error).toBeInstanceOf(UnProcessableEntityError)
  })

  it('should have the correct status and message properties', () => {
    expect.assertions(2)
    const error = new UnProcessableEntityError('Unprocessable Entity')
    expect(error.status).toBe(422)
    expect(error.message).toBe('Unprocessable Entity')
  })
})

/**
 * Test suite for InternalServerError class
 */
describe('InternalServerError', () => {
  it('should create an instance of InternalServerError', () => {
    expect.assertions(1)
    const error = new InternalServerError('Internal Server Error')
    expect(error).toBeInstanceOf(InternalServerError)
  })

  it('should have the correct status and message properties', () => {
    expect.assertions(2)
    const error = new InternalServerError('Internal Server Error')
    expect(error.status).toBe(500)
    expect(error.message).toBe('Internal Server Error')
  })
})
