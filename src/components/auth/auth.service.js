const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');
const { generateJWT } = require('./jwt.service');
const { BadRequestError, NotFoundError } = require('../../utils/api-errors');

const AuthService = {
  /**
   * Login a user and generate token.
   * @async
   * @method
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} When the user is not found.
   */

  doLogin: async (requestBody) => {
    const { phone, password } = requestBody;
    const user = await User.findOne({
      where: {
        phone
      }
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const isValidPass = bcrypt.compareSync(password, user.password);
    if (!isValidPass) {
      throw new BadRequestError('Username or Password is invalid!');
    }

    const payload = {
      userId: user.id,
      role: user.role
    };

    const accessToken = await generateJWT({
      payload
    });
    return {
      accessToken,
      ...payload
    };
  }
};

module.exports = AuthService;
