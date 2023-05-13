const winston = require('winston');
const { NODE_ENV } = require('config');
const expressWinston = require('express-winston');
const packageName = require('../../../package.json');

// Log formatter function
const logFormatter = winston.format.printf((info) => {
  const { timestamp, level, stack, message } = info;
  const errorMessage = stack || message;

  const symbols = Object.getOwnPropertySymbols(info);
  if (info[symbols[0]] !== 'error') {
    return `${timestamp} ${level}: ${message}`;
  }

  return `${timestamp} ${level}: ${errorMessage}`;
});

// Create the base logger configuration
const baseLoggerConfig = {
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: `${packageName.name.toLocaleLowerCase()}-service` },
};

// Create the console transport configuration
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(winston.format.colorize(), logFormatter),
});

// Create the logger with the console transport
const logger = winston.createLogger({
  ...baseLoggerConfig,
  transports: [consoleTransport],
});

// Add file transports if in production environment
if (NODE_ENV === 'production') {
  logger.add(
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
  );
  logger.add(
    new winston.transports.File({
      filename: 'logs/combined.log',
      level: 'debug',
    })
  );
}

// Export the logger
module.exports = logger;

// Export the request logger middleware
module.exports.requestLogger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
  /**
   * A function that always returns `false`.
   * @param {object} _req - The request object.
   * @param {object} _res - The response object.
   * @returns {boolean} - Always returns `false`.
   */
  ignoreRoute(_req, _res) {
    return false;
  },
});
