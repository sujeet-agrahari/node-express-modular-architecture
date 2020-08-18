const jwt = require('jsonwebtoken');

const generateJWT = async ({ secretKey, payload, signOption }) => {
  const token = `Bearer ${jwt.sign(payload, secretKey, signOption)}`;
  return token;
};
const verifyJWT = async ({ token, secretKey, signOption }) => {
  const data = jwt.verify(token, secretKey, signOption);
  return data;
};
module.exports = {
  generateJWT,
  verifyJWT,
};
