const winston = require('winston');

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize(),
  ),
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
    }),
  ],
});

module.exports = {
  logger,
};
