/**
 * Context
 * @typedef {Object} Context
 * @property {String} userId
 * @property {String} role
 * @property {String} accessToken
 */

/**
 * ExpressRequest
 * @typedef {import('express').Request} ExpressRequest
 */

/**
 * ExpressResponse
 * @typedef {import('express').Response} ExpressResponse
 */

/**
 * ExpressNextFunction
 * @typedef {import('express').NextFunction} ExpressNextFunction
 */

/**
 * ControllerResponse
 * @typedef {Object} ControllerResponse
 * @property {Number} statusCode
 * @property {{ data: (Object | Array )}} body
 */

/**
 * ExpressRouter
 * @typedef {import('express').Router} ExpressRouter
 */

/**
 * @typedef {Function} makeValidatorCallback
 * @param {Function} validator
 * @returns {Function(ExpressRequest, ExpressResponse, ExpressNextFunction): undefined}
 */

/**
 * @typedef {Function} makeExpressCallback
 * @param {Function} validator
 */
