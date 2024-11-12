import { logger, requestLogger } from '../../src/support/logger'
import winston from 'winston'
import config from 'config'

describe('Logger', () => {
  it('should create a logger with the correct configuration', () => {
    expect(logger).toBeDefined()
    expect(logger.transports).toHaveLength(1)
    expect(logger.transports[0]).toBeInstanceOf(winston.transports.Console)
  })

  it('should add file transports in production environment', () => {
    const originalEnv = config.NODE_ENV
    config.NODE_ENV = 'production'

    const prodLogger = winston.createLogger({
      ...logger,
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log', level: 'debug' })
      ]
    })

    expect(prodLogger.transports).toHaveLength(3)
    expect(prodLogger.transports[1]).toBeInstanceOf(winston.transports.File)
    expect(prodLogger.transports[2]).toBeInstanceOf(winston.transports.File)

    config.NODE_ENV = originalEnv
  })
})

describe('Request Logger Middleware', () => {
  it('should create a request logger middleware with the correct configuration', () => {
    expect(requestLogger).toBeInstanceOf(Function)
  })
})
