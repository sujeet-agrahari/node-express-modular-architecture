const jwt = require('jsonwebtoken');
const { JWT_ACCESS_TOKEN_SECRET, JWT_SIGN_OPTIONS } = require('config');
const { BadRequestError } = require('../../utils/api-errors');

const generateJWT = async ({ payload, secretKey = JWT_ACCESS_TOKEN_SECRET, signOption = JWT_SIGN_OPTIONS }) => {
  try {
    const token = `Bearer ${jwt.sign(payload, secretKey, signOption)}`;
    return token;
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};
const verifyJWT = async ({ token, secretKey = JWT_ACCESS_TOKEN_SECRET, signOption = JWT_SIGN_OPTIONS }) => {
  try {
    const data = jwt.verify(token, secretKey, signOption);
    return data;
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};
module.exports = {
  generateJWT,
  verifyJWT
};
