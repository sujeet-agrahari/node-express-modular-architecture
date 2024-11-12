import jwt from 'jsonwebtoken'
import config from 'config'
import { BadRequestError } from '../../utils/api-errors.js'

/**
 * Generates a JWT token.
 * @param {object} root0 - The input object.
 * @param {object} root0.payload - The payload to sign.
 * @param {string} [root0.secretKey=JWT_ACCESS_TOKEN_SECRET] - The secret key to use for signing.
 * @param {object} [root0.signOption=JWT_SIGN_OPTIONS] - The sign options to use.
 * @returns {Promise<string>} - The generated JWT token.
 * @throws {BadRequestError} - If there is an error generating the token.
 */
export const generateJWT = async ({
  payload,
  secretKey = config.JWT_ACCESS_TOKEN_SECRET,
  signOption = config.JWT_SIGN_OPTIONS
}) => {
  try {
    const token = `Bearer ${jwt.sign(payload, secretKey, signOption)}`
    return token
  } catch (error) {
    throw new BadRequestError(error.message)
  }
}

/**
 * Verifies a JWT token.
 * @param {object} root0 - The input object.
 * @param {string} root0.token - The token to verify.
 * @param {string} [root0.secretKey=JWT_ACCESS_TOKEN_SECRET] - The secret key to use for verification.
 * @param {object} [root0.signOption=JWT_SIGN_OPTIONS] - The sign options to use.
 * @returns {Promise<object>} - The decoded token data.
 * @throws {BadRequestError} - If there is an error verifying the token.
 */
export const verifyJWT = async ({
  token,
  secretKey = config.JWT_ACCESS_TOKEN_SECRET,
  signOption = config.JWT_SIGN_OPTIONS
}) => {
  try {
    const data = jwt.verify(token, secretKey, signOption)
    return data
  } catch (error) {
    throw new BadRequestError(error.message)
  }
}

export default { generateJWT, verifyJWT }
