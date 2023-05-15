const {
  UniqueConstraintError,
  ValidationError,
  AggregateError,
} = require('sequelize');
const logger = require('../../src/support/logger');
const { APIError } = require('../../src/utils/api-errors');
const errorHandlerMiddleware = require('../../src/middlewares/error-handler');

jest.mock('../../src/support/logger');

describe('errorHandlerMiddleware', () => {
  test('should return APIError response if error is an instance of APIError', () => {
    expect.assertions(2);

    const error = new APIError('Test error', 400);
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    errorHandlerMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(error.status);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        code: error.status,
        message: error.message,
      },
    });
  });

  test('should return UniqueConstraintError response if error is an instance of UniqueConstraintError', () => {
    expect.assertions(2);

    const error = new UniqueConstraintError({
      message: 'Validation error',
      errors: [
        {
          message: 'Duplicate key value violates unique constraint',
          path: 'email',
          type: 'unique violation',
          value: 'test@example.com',
          origin: 'DB',
          instance: null,
          validatorKey: 'not_unique',
        },
      ],
      fields: ['email'],
      parent: {
        constraint: 'users_email_key',
      },
    });
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    errorHandlerMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        code: 400,
        message: `duplicate_${error.parent.constraint}`,
      },
    });
  });

  test('should return ValidationError response if error is an instance of ValidationError', () => {
    expect.assertions(2);

    const error = new ValidationError('Validation error');
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    errorHandlerMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        code: 400,
        message: error.message,
      },
    });
  });

  test('should send response with the first error message if error is instance of AggregationError', async () => {
    expect.assertions(2);

    const error = new AggregateError([
      {
        message: 'Validation error-1',
      },
      {
        message: 'Validation error-1',
      },
    ]);
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    await errorHandlerMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        code: 400,
        message: 'Validation error-1',
      },
    });
  });

  test('should send response with "Unknown error" no error message and error is instance of AggregationError', async () => {
    expect.assertions(2);

    const error = new AggregateError([]);
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    await errorHandlerMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        code: 400,
        message: 'Unknown error',
      },
    });
  });

  test('should return default error response if error is not an instance of any known error type', () => {
    expect.assertions(2);

    const error = new Error('Test error');
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    errorHandlerMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        code: 500,
        message: 'Something went wrong!',
      },
    });
  });

  test('should log error using logger', () => {
    expect.assertions(1);

    const error = new Error('Test error');
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    errorHandlerMiddleware(error, req, res, next);

    expect(logger.error).toHaveBeenCalledWith(error);
  });
});
