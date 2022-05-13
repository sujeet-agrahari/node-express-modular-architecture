const winston = require('winston');
const { NODE_ENV } = require('config');
const expressWinston = require('express-winston');
const packageName = require('../../../package.json');

const logFormatter = winston.format.printf((info) => {
  const { timestamp, level, stack, message } = info;
  const errorMessage = stack || message;

  const symbols = Object.getOwnPropertySymbols(info);
  if (info[symbols[0]] !== 'error') {
    return `${timestamp} ${level}: ${message}`;
  }

  return `${timestamp} ${level}: ${errorMessage}`;
});

const logger = winston.createLogger({
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: `${packageName.name.toLocaleLowerCase()}-service` },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormatter)
    })
  ]
});

if (NODE_ENV === 'production') {
  logger.add(new winston.transports.File({ filename: 'logs/error.log', level: 'error' }));
  logger.add(new winston.transports.File({ filename: 'logs/combined.log', level: 'info' }));
}

module.exports = logger;

module.exports.requestLogger = expressWinston.logger({
  transports: [new winston.transports.Console()],

  format: winston.format.combine(
    winston.format.printf((info) => {
      return JSON.stringify(info, null, 2);
    })
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute(req, res) {
    return false;
  } // optional: allows to skip some log messages based on request and/or response
});
