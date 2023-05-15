const { BadRequestError } = require('../../src/utils/api-errors');
const validateJsonMiddleware = require('../../src/middlewares/validate-json');

describe('validate-json middleware', () => {
  test('should throw BadRequestError if err is a SyntaxError with status 400 and body property', async () => {
    expect.assertions(2);
    const err = new SyntaxError('Invalid JSON');
    err.status = 400;
    err.body = '{ "foo": "bar }';

    const req = {};
    const res = {};
    const next = jest.fn();

    try {
      await validateJsonMiddleware(err, req, res, next);
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeInstanceOf(BadRequestError);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.message).toBe(err.message);
    }
  });

  test('should call next if err is not a SyntaxError with status 400 and body property', () => {
    expect.assertions(1);

    const err = new Error('Internal server error');
    err.status = 500;
    err.body = '{ "foo": "bar" }';

    const req = {};
    const res = {};
    const next = jest.fn();

    validateJsonMiddleware(err, req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
