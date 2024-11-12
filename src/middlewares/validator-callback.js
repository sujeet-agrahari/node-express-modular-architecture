import { BadRequestError } from '../utils/api-errors.js'

/**
 * Middleware to validate request using the provided validator function.
 *
 * @param {Function} validator - The validation function to validate the request.
 * @returns {Function} - Express middleware function.
 */
const validatorCallback = (validator) => (req, res, next) => {
  const httpRequest = {
    body: req.body,
    query: req.query,
    params: req.params
  }
  const { error, value } = validator(httpRequest)
  if (error) {
    throw new BadRequestError(error.message)
  }
  req.body = value
  return next()
}

export default validatorCallback
