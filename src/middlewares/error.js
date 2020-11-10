
const db = require('sequelize');
const { logger } = require('../utils/logger');
const { APIError } = require('../utils/api-errors');

module.exports = async (err, req, res, next) => {
  console.log(err);
  // log any kind of error
  if (process.env.NODE_ENV === 'production') {
    logger.log({
      date: new Date().toISOString(),
      level: 'error',
      env: process.env.NODE_ENV,
      client: req.connection.remoteAddress,
      method: req.method,
      api: req.url,
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
  }
  // catch all api errors
  if (err instanceof APIError) {
    return res.status(err.status).send({ success: false, message: err.message });
  }
  // connect all errors
  return res.status(500).send({ success: false, message: 'Something went wrong!' });
};
