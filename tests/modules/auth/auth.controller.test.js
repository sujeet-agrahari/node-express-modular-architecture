const { faker } = require('@faker-js/faker');

const AuthController = require('../../../src/modules/auth/auth.controller');
const AuthService = require('../../../src/modules/auth/auth.service');
const JwtService = require('../../../src/modules/auth/jwt.service');

describe('AuthController', () => {
  const payload = {
    userId: faker.datatype.uuid(),
    role: 'User',
  };

  let jwtToken;

  beforeAll(async () => {
    jwtToken = await JwtService.generateJWT({
      payload,
      secretKey: 'secretKey',
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('login', () => {
    it('should login user and return token', async () => {
      expect.assertions(2);
      // Arrange
      const httpRequest = {
        body: {
          phone: faker.phone.phoneNumber('##########'),
          password: faker.internet.password(8),
        },
      };

      const loginData = {
        ...payload,
        accessToken: jwtToken,
      };

      const expected = {
        statusCode: 200,
        data: loginData,
      };

      const doLoginMock = jest.fn().mockResolvedValue(loginData);
      AuthService.doLogin = doLoginMock;

      // Act
      const result = await AuthController.login(httpRequest);

      // Assert
      expect(result).toEqual(expected);
      expect(doLoginMock).toHaveBeenCalledWith(httpRequest.body);
    });
  });
});
