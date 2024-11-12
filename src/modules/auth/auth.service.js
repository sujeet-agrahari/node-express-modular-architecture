import bcrypt from 'bcryptjs'
import User from '../../db/models/User.js'
import { generateJWT } from './jwt.service.js'
import { BadRequestError, NotFoundError } from '../../utils/api-errors.js'

/**
 * AuthService module to handle authentication related operations.
 * @module AuthService
 */
const AuthService = {
  /**
   * Logs in a user and generates a token.
   * @async
   * @function
   * @param {Object} requestBody - Request Body
   * @param {string} requestBody.phone - User's phone number
   * @param {string} requestBody.password - User's password
   * @returns {Promise<Object>} Context object containing accessToken, userId, and role
   * @throws {NotFoundError} If the user is not found.
   * @throws {BadRequestError} If the password is invalid.
   */
  doLogin: async (requestBody) => {
    const { phone, password } = requestBody
    const user = await User.findOne({
      where: {
        phone
      }
    })
    if (!user) {
      throw new NotFoundError('User not found')
    }
    const isValidPass = bcrypt.compareSync(password, user.password)
    if (!isValidPass) {
      throw new BadRequestError('Username or Password is invalid!')
    }

    const payload = {
      userId: user.id,
      role: user.role
    }

    const accessToken = await generateJWT({
      payload
    })
    return {
      accessToken,
      ...payload
    }
  }
}

export default AuthService
