const authMiddleware = require('../../src/middlewares/auth');
const JwtService = require('../../src/modules/auth/jwt.service');
const { UnauthorizedError } = require('../../src/utils/api-errors');

jest.mock('../../src/modules/auth/jwt.service');

describe('auth middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      method: 'GET',
      path: '/api/v1/test',
      header: jest.fn(),
    };
    res = {};
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call next if method is OPTIONS', async () => {
    expect.assertions(1);
    req.method = 'OPTIONS';

    await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('should call next if path is /api/v1/auth/login', async () => {
    expect.assertions(1);

    req.path = '/api/v1/auth/login';

    await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('should set req.context if Authorization header is present', async () => {
    expect.assertions(2);

    req.header.mockReturnValueOnce('Bearer token');
    JwtService.verifyJWT.mockResolvedValueOnce({ userId: 1 });

    await authMiddleware(req, res, next);

    expect(req.context).toEqual({ userId: 1 });
    expect(next).toHaveBeenCalled();
  });

  test('should throw UnauthorizedError if Authorization header is missing', async () => {
    expect.assertions(1);

    req.header.mockReturnValueOnce(undefined);

    await expect(authMiddleware(req, res, next)).rejects.toThrow(
      UnauthorizedError
    );
  });
});
