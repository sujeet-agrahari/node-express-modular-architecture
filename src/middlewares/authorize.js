import { UnauthorizedError } from '../utils/api-errors.js'

/**
 * Middleware to authorize based on user roles.
 *
 * @param {Array<string>} roles - Array of roles that are allowed to access the route.
 * @returns {Function} Middleware function to check user role.
 */
const authorize = (roles) => (req, res, next) => {
  if (!req.user.role || !roles.includes(req.user.role)) {
    throw new UnauthorizedError()
  }
  return next()
}

export default authorize
