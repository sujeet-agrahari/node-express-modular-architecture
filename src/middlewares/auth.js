const AuthService = require('../components/auth/auth.service');

const { verifyJWT } = require('../components/auth/jwt.service');
const { UnauthorizedError } = require('../utils/api-errors');

module.exports = async (req, res, next) => {
  let token = req.header('Authorization') || req.header('authorization');
  if (!token) throw new UnauthorizedError();
  token = req.headers.authorization.replace('Bearer ', '');

  const payload = await verifyJWT(token);
  req.user = payload;
  // check if user is not blocked and exist
  await AuthService.doCheckIsUserExist({ userId: req.user.id });
  return next();
};
