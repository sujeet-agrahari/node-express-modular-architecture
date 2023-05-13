const { BadRequestError } = require('../utils/api-errors');

/**
 *
 * @param validator
 */
module.exports = (validator) => (req, res, next) => {
  const httpRequest = {
    body: req.body,
    query: req.query,
    params: req.params,
  };
  const { error, value } = validator(httpRequest);
  if (error) {
    throw new BadRequestError(error.message);
  }
  req.body = value;
  return next();
};
