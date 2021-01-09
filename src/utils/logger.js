const expressWinston = require('express-winston')
const { createLogger, format, transports } = require('winston');

const logger = expressWinston.errorLogger({
  transports: [
    new transports.File({
      json: true,
      maxFiles: 5,
      level: 'error',
      colorize: false,
      filename: 'logs/error.log',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
    }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
    level: 'debug',
  }));
}

module.exports = logger;