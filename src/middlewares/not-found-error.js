import { NotFoundError } from '../utils/api-errors.js'

/**
 * Middleware to handle not found errors.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const notFoundErrorHandler = (req, _res) => {
  const errorMessage = `Not Found: ${req.method} on ${req.url}`
  throw new NotFoundError(errorMessage)
}

export default notFoundErrorHandler
