/* eslint-disable max-classes-per-file */
/**
 *
 */
class APIError extends Error {
  /**
   * Create a new HTTP error.
   * @param {number} status - The HTTP status code of the error.
   * @param {string} message - The error message.
   */
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

/**
 *
 */
class BadRequestError extends APIError {
  /**
   * Create a new `BadRequest` error.
   * @param {string} [message='Bad Request'] - The error message.
   */
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

/**
 *
 */
class AccessDeniedError extends APIError {
  /**
   * Create a new `AccessDenied` error.
   * @param {string} [message='Access Denied'] - The error message.
   */
  constructor(message = 'Access denied') {
    super(401, message);
  }
}

/**
 *
 */
class UnauthorizedError extends APIError {
  /**
   * Create a new `Unauthorized` error.
   * @param {string} [message='Unauthorized'] - The error message.
   */
  constructor(message = 'Unauthorized') {
    super(403, message);
  }
}

/**
 *
 */
class ForbiddenError extends APIError {
  /**
   * Create a new `Forbidden` error.
   * @param {string} [message='Forbidden'] - The error message.
   */
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

/**
 *
 */
class NotFoundError extends APIError {
  /**
   * Create a new `NotFound` error.
   * @param {string} [message='Not Found'] - The error message.
   */
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

/**
 *
 */
class MethodNotAllowedError extends APIError {
  /**
   * Create a new `MethodNotAllowed` error.
   * @param {string} [message='Method Not Allowed'] - The error message.
   */
  constructor(message = 'Method Not Allowed') {
    super(405, message);
  }
}

/**
 *
 */
class ConflictError extends APIError {
  /**
   * Create a new `Conflict` error.
   * @param {string} [message='Conflict'] - The error message.
   */
  constructor(message = 'Conflict') {
    super(408, message);
  }
}

/**
 *
 */
class UnSupportedMediaTypeError extends APIError {
  /**
   * Create a new `UnsupportedMediaType` error.
   * @param {string} [message='Unsupported Media Type'] - The error message.
   */
  constructor(message = 'Unsupported Media Type') {
    super(415, message);
  }
}

/**
 *
 */
class UnProcessableEntityError extends APIError {
  /**
   * Create a new `UnProcessableEntity` error.
   * @param {string} [message='Unprocessable Entity'] - The error message.
   */
  constructor(message = 'Unprocessable Entity') {
    super(422, message);
  }
}

/**
 *
 */
class InternalServerError extends APIError {
  /**
   * Create a new `InternalServer` error.
   * @param {string} [message='Inter Server Error'] - The error message.
   */
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}

module.exports = {
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
  UnSupportedMediaTypeError,
};
