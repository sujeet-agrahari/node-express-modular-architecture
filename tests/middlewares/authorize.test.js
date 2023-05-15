const authorizeMiddleware = require('../../src/middlewares/authorize');
const { UnauthorizedError } = require('../../src/utils/api-errors');

describe('authorize middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      user: {},
    };
    res = {};
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call next if user role is included in allowed roles', async () => {
    expect.assertions(1);
    req.user.role = 'admin';

    await authorizeMiddleware(['admin'])(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('should throw UnauthorizedError if user role is not included in allowed roles', async () => {
    expect.assertions(2);

    const err = new UnauthorizedError();

    req.user.role = 'user';

    try {
      await authorizeMiddleware(['admin'])(req, res, next);
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBeInstanceOf(UnauthorizedError);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.message).toBe(err.message);
    }
  });
});
