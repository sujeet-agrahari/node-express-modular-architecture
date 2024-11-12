import { BadRequestError } from '../utils/api-errors.js'

/**
 * Middleware to validate JSON syntax in request body
 *
 * @param {Object} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const validateJson = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    throw new BadRequestError(err.message)
  }
  return next()
}

export default validateJson
