/**
 * Base class for API errors.
 */
class APIError extends Error {
  /**
   * Create a new HTTP error.
   * @param {number} status - The HTTP status code of the error.
   * @param {string} message - The error message.
   */
  constructor (status, message) {
    super()
    this.status = status
    this.message = message
  }
}

/**
 * Class representing a Bad Request error.
 */
class BadRequestError extends APIError {
  /**
   * Create a new `BadRequest` error.
   * @param {string} [message='Bad Request'] - The error message.
   */
  constructor (message = 'Bad Request') {
    super(400, message)
  }
}

/**
 * Class representing an Access Denied error.
 */
class AccessDeniedError extends APIError {
  /**
   * Create a new `AccessDenied` error.
   * @param {string} [message='Access Denied'] - The error message.
   */
  constructor (message = 'Access Denied') {
    super(401, message)
  }
}

/**
 * Class representing an Unauthorized error.
 */
class UnauthorizedError extends APIError {
  /**
   * Create a new `Unauthorized` error.
   * @param {string} [message='Unauthorized'] - The error message.
   */
  constructor (message = 'Unauthorized') {
    super(403, message)
  }
}

/**
 * Class representing a Forbidden error.
 */
class ForbiddenError extends APIError {
  /**
   * Create a new `Forbidden` error.
   * @param {string} [message='Forbidden'] - The error message.
   */
  constructor (message = 'Forbidden') {
    super(403, message)
  }
}

/**
 * Class representing a Not Found error.
 */
class NotFoundError extends APIError {
  /**
   * Create a new `NotFound` error.
   * @param {string} [message='Not Found'] - The error message.
   */
  constructor (message = 'Not Found') {
    super(404, message)
  }
}

/**
 * Class representing a Method Not Allowed error.
 */
class MethodNotAllowedError extends APIError {
  /**
   * Create a new `MethodNotAllowed` error.
   * @param {string} [message='Method Not Allowed'] - The error message.
   */
  constructor (message = 'Method Not Allowed') {
    super(405, message)
  }
}

/**
 * Class representing a Conflict error.
 */
class ConflictError extends APIError {
  /**
   * Create a new `Conflict` error.
   * @param {string} [message='Conflict'] - The error message.
   */
  constructor (message = 'Conflict') {
    super(408, message)
  }
}

/**
 * Class representing an Unsupported Media Type error.
 */
class UnSupportedMediaTypeError extends APIError {
  /**
   * Create a new `UnsupportedMediaType` error.
   * @param {string} [message='Unsupported Media Type'] - The error message.
   */
  constructor (message = 'Unsupported Media Type') {
    super(415, message)
  }
}

/**
 * Class representing an Unprocessable Entity error.
 */
class UnProcessableEntityError extends APIError {
  /**
   * Create a new `UnProcessableEntity` error.
   * @param {string} [message='Unprocessable Entity'] - The error message.
   */
  constructor (message = 'Unprocessable Entity') {
    super(422, message)
  }
}

/**
 * Class representing an Internal Server error.
 */
class InternalServerError extends APIError {
  /**
   * Create a new `InternalServer` error.
   * @param {string} [message='Internal Server Error'] - The error message.
   */
  constructor (message = 'Internal Server Error') {
    super(500, message)
  }
}

export {
  APIError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  AccessDeniedError,
  InternalServerError,
  MethodNotAllowedError,
  UnProcessableEntityError,
  UnSupportedMediaTypeError
}
