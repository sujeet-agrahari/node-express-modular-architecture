const {
  UniqueConstraintError,
  ValidationError,
  AggregateError,
} = require('sequelize');
const logger = require('../support/logger');
const { APIError } = require('../utils/api-errors');

/**
 *
 * @param error
 * @param req
 * @param res
 * @param next
 */
module.exports = (error, req, res, _next) => {
  logger.error(error);

  // catch api error
  if (error instanceof APIError) {
    return res.status(error.status).send({
      error: {
        code: error.status,
        message: error.message,
      },
    });
  }

  // catch db error
  if (error instanceof UniqueConstraintError) {
    return res.status(400).send({
      error: {
        code: 400,
        message: `duplicate_${error.parent.constraint}`,
      },
    });
  }
  if (error instanceof ValidationError) {
    return res.status(400).send({
      error: {
        code: 400,
        message: error.message,
      },
    });
  }
  if (error instanceof AggregateError) {
    const firstErrorMessage = error.errors[0]?.message || 'Unknown error';
    return res.status(400).send({
      error: {
        code: 400,
        message: firstErrorMessage,
      },
    });
  }

  // connect all errors
  return res.status(500).send({
    error: {
      code: 500,
      message: 'Something went wrong!',
    },
  });
};
