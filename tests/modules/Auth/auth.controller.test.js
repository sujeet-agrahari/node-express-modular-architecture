import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';

const sinon = require('sinon');
const { faker } = require('@faker-js/faker');

const AuthController = require('../../../src/modules/auth/auth.controller');
const AuthService = require('../../../src/modules/auth/auth.service');
const JwtService = require('../../../src/modules/auth/jwt.service');

describe('AuthController Tests', () => {
  let sandbox;

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

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('login', () => {
    it('should login user and return token', async () => {
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
        body: {
          data: loginData,
        },
      };
      sandbox.stub(AuthService, 'doLogin').resolves(loginData);

      // Act
      const result = await AuthController.login(httpRequest);

      // Assert
      expect(result).toEqual(expected);
    });
  });
});
