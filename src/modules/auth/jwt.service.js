const jwt = require('jsonwebtoken');
const { JWT_ACCESS_TOKEN_SECRET, JWT_SIGN_OPTIONS } = require('config');
const { BadRequestError } = require('../../utils/api-errors');

module.exports = {
  /**
   * Generates a JWT token.
   * @param {object} root0 - The input object.
   * @param {object} root0.payload - The payload to sign.
   * @param {string} [root0.secretKey=JWT_ACCESS_TOKEN_SECRET] - The secret key to use for signing.
   * @param {object} [root0.signOption=JWT_SIGN_OPTIONS] - The sign options to use.
   * @returns {Promise<string>} - The generated JWT token.
   * @throws {BadRequestError} - If there is an error generating the token.
   */
  generateJWT: async ({
    payload,
    secretKey = JWT_ACCESS_TOKEN_SECRET,
    signOption = JWT_SIGN_OPTIONS,
  }) => {
    try {
      const token = `Bearer ${jwt.sign(payload, secretKey, signOption)}`;
      return token;
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  },
  /**
   * Verifies a JWT token.
   * @param {object} root0 - The input object.
   * @param {string} root0.token - The token to verify.
   * @param {string} [root0.secretKey=JWT_ACCESS_TOKEN_SECRET] - The secret key to use for verification.
   * @param {object} [root0.signOption=JWT_SIGN_OPTIONS] - The sign options to use.
   * @returns {Promise<object>} - The decoded token data.
   * @throws {BadRequestError} - If there is an error verifying the token.
   */
  verifyJWT: async ({
    token,
    secretKey = JWT_ACCESS_TOKEN_SECRET,
    signOption = JWT_SIGN_OPTIONS,
  }) => {
    try {
      const data = jwt.verify(token, secretKey, signOption);
      return data;
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  },
};
