const {
  JWT_ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  SIGN_OPTION,
} = require('config');
const bcrypt = require('bcryptjs');
const { User } = require('../db');
const { generateJWT } = require('../utils/jwt');
const { NotFoundError, BadRequestError } = require('../utils/api-errors');

const doRegister = async ({ username, password }) => {
  const user = await User.create({
    username,
    password,
    role_id: 1, // assign role id here
  });
    // generate access token
  const payload = {
    username,
    role: user.role_id,
  };
  const token = await generateJWT({
    secretKey: JWT_ACCESS_TOKEN_SECRET,
    payload,
    signOption: {
      ...SIGN_OPTION,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  });
  return {
    access_token: token,
    ...payload,
  };
};

const doLogin = async ({
  username, userRole, passedPassword, actualPassword,
}) => {
  const isValidPass = bcrypt.compareSync(passedPassword, actualPassword);
  if (!isValidPass) throw new BadRequestError('Username or Password is invalid!');
  // generate access token
  const payload = {
    username,
    role: userRole,
  };
  const token = await generateJWT({
    secretKey: JWT_ACCESS_TOKEN_SECRET,
    payload,
    signOption: {
      ...SIGN_OPTION,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  });
  return {
    access_token: token,
    ...payload,
  };
};
const doCheckUserExist = async ({ username }) => {
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (!user) throw new NotFoundError('User not found!');
  return user;
};

module.exports = { doRegister, doLogin, doCheckUserExist };
