import { verifyJWT } from '../modules/auth/jwt.service.js'
import { UnauthorizedError } from '../utils/api-errors.js'

/**
 * Decodes a JWT token from the provided authorization header.
 *
 * @param {string} header - The authorization header containing the JWT token.
 * @returns {Promise<Object>} The decoded payload of the JWT token.
 * @throws {UnauthorizedError} If the authorization header is missing or invalid.
 */
const decodeToken = async (header) => {
  if (!header) {
    throw new UnauthorizedError('Authorization header missing')
  }
  const token = header.replace('Bearer ', '')
  const payload = await verifyJWT({ token })
  return payload
}

/**
 * Middleware to handle authentication.
 *
 * This middleware checks the HTTP method and path of the request. If the method is 'OPTIONS'
 * or the path is '/api/v1/auth/login', it allows the request to proceed without authentication.
 * For other requests, it attempts to decode the token from the 'Authorization' header and
 * attaches the decoded token to the request context.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the middleware is complete.
 */
const authMiddleware = async (req, res, next) => {
  const { method, path } = req
  if (method === 'OPTIONS' || ['/api/v1/auth/login'].includes(path)) {
    return next()
  }
  req.context = await decodeToken(
    req.header('Authorization') || req.header('authorization')
  )
  return next()
}

export default authMiddleware
