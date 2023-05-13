/**
 * Represents a context object.
 * @typedef {object} Context
 * @property {string} userId - The user ID.
 * @property {string} role - The user role.
 * @property {string} accessToken - The access token.
 */

/**
 * Represents an Express request object.
 * @typedef {import('express').Request} ExpressRequest
 */

/**
 * Represents an Express response object.
 * @typedef {import('express').Response} ExpressResponse
 */

/**
 * Represents an Express next function.
 * @typedef {import('express').NextFunction} ExpressNextFunction
 */

/**
 * Represents a controller response object.
 * @typedef {object} ControllerResponse
 * @property {number} statusCode - The HTTP status code.
 * @property {{data: (object | Array)}} body - The response body.
 */

/**
 * A function that creates an Express validator callback.
 * @typedef {Function} makeValidatorCallback
 * @param {Function} validator - The validation function.
 * @returns {function(ExpressRequest, ExpressResponse, ExpressNextFunction): void} - The Express validator callback.
 */

/**
 * A function that creates an Express callback.
 * @typedef {Function} makeExpressCallback
 * @param {Function} validator - The validation function.
 */

/**
 * Represents a user data transfer object.
 * @typedef {object} UserDto
 * @property {string} id - The user ID.
 * @property {string} phone - The user phone number.
 * @property {string} password - The user password.
 * @property {Date} createdAt - The date the user was created.
 * @property {Date} updatedAt - The date the user was last updated.
 */
