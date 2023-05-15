const authorizeMiddleware = require('../../src/middlewares/authorize');
const { UnauthorizedError } = require('../../src/utils/api-errors');

describe('middleware', () => {
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
    expect.assertions(1);

    req.user.role = 'user';

    await expect(
      authorizeMiddleware(['admin'])(req, res, next)
    ).rejects.toThrow(UnauthorizedError);
  });
});
