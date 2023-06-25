const expressCallbackMiddleware = require('../../src/middlewares/express-callback');

describe('express-callback middleware', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = {
      body: {},
      query: {},
      params: {},
      ip: '127.0.0.1',
      method: 'GET',
      path: '/api/v1/test',
      get: jest.fn(),
    };
    res = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    controller = jest.fn().mockResolvedValue({
      statusCode: 200,
      body: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call controller with correct httpRequest', async () => {
    expect.assertions(1);

    await expressCallbackMiddleware(controller)(req, res);

    expect(controller).toHaveBeenCalledWith({
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Authorization: req.get('Authorization'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    });
  });

  test('should set headers and send response with correct status code and body', async () => {
    expect.assertions(3);

    const httpResponse = {
      statusCode: 200,
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    };
    controller.mockResolvedValueOnce(httpResponse);

    await expressCallbackMiddleware(controller)(req, res);

    expect(res.set).toHaveBeenCalledWith(httpResponse.headers);
    expect(res.status).toHaveBeenCalledWith(httpResponse.statusCode);
    expect(res.send).toHaveBeenCalledWith(httpResponse.data);
  });
});
