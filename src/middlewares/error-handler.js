import { UniqueConstraintError, ValidationError, AggregateError } from 'sequelize'
import { logger } from '../support/logger.js'
import { APIError } from '../utils/api-errors.js'

/**
 * Error handling middleware for Express
 *
 * @param {Error} error - The error object
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 * @param {Function} _next - The next middleware function
 */
const errorHandler = (error, req, res, _next) => {
  logger.error(error)

  // catch api error
  if (error instanceof APIError) {
    return res.status(error.status).json({
      error: {
        code: error.status,
        message: error.message
      }
    })
  }

  // catch db error
  if (error instanceof UniqueConstraintError) {
    return res.status(400).json({
      error: {
        code: 400,
        message: `duplicate_${error.parent.constraint}`
      }
    })
  }
  if (error instanceof ValidationError) {
    return res.status(400).json({
      error: {
        code: 400,
        message: error.message
      }
    })
  }
  if (error instanceof AggregateError) {
    const firstErrorMessage = error.errors[0]?.message || 'Unknown error'
    return res.status(400).json({
      error: {
        code: 400,
        message: firstErrorMessage
      }
    })
  }

  // connect all errors
  return res.status(500).json({
    error: {
      code: 500,
      message: 'Something went wrong!'
    }
  })
}

export default errorHandler
