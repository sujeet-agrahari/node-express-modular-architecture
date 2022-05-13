const { NotFoundError } = require('../utils/api-errors');

module.exports = async (req, res) => {
  const errorMessage = `Not Found: ${req.method} on ${req.url}`;
  throw new NotFoundError(errorMessage);
};
