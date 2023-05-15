const validatorCallback = require('../../src/middlewares/validator-callback');
const { BadRequestError } = require('../../src/utils/api-errors');

describe('validator-callback middleware', () => {
  let req;
  let res;
  let next;
  let validator;

  beforeEach(() => {
    req = {
      body: {},
      query: {},
      params: {},
    };
    res = {};
    next = jest.fn();
    validator = jest.fn().mockReturnValue({
      error: null,
      value: {},
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call validator with correct httpRequest', async () => {
    expect.assertions(1);

    await validatorCallback(validator)(req, res, next);

    expect(validator).toHaveBeenCalledWith({
      body: req.body,
      query: req.query,
      params: req.params,
    });
  });

  test('should set req.body with validated value and call next', async () => {
    expect.assertions(2);

    const validatedValue = { foo: 'bar' };
    validator.mockReturnValueOnce({
      error: null,
      value: validatedValue,
    });

    await validatorCallback(validator)(req, res, next);

    expect(req.body).toEqual(validatedValue);
    expect(next).toHaveBeenCalled();
  });

  test('should throw BadRequestError if validator returns an error', async () => {
    expect.assertions(2);

    const validationError = new Error('Validation error');
    validator.mockReturnValueOnce({
      error: validationError,
      value: null,
    });

    try {
      await validatorCallback(validator)(req, res, next);
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeInstanceOf(BadRequestError);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.message).toBe(validationError.message);
    }
  });
});
