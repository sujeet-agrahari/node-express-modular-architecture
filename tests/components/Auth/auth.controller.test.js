const sinon = require('sinon');
const { faker } = require('@faker-js/faker');
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

const AuthController = require('../../../src/components/Auth/auth.controller');
const AuthService = require('../../../src/components/Auth/auth.service');
const { generateJWT } = require('../../../src/components/Auth/jwt.service');

describe('AuthController Tests', async () => {
  let sandbox;

  const payload = {
    userId: faker.datatype.uuid(),
    role: 'User'
  };

  const jwtToken = await generateJWT({
    payload,
    secretKey: 'secretKey'
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
          password: faker.internet.password(8)
        }
      };

      const loginData = {
        ...payload,
        accessToken: jwtToken
      };

      const expected = {
        statusCode: 200,
        body: {
          data: loginData
        }
      };
      sandbox.stub(AuthService, 'doLogin').resolves(loginData);

      // Act
      const result = await AuthController.login(httpRequest);

      // Assert
      expect(result).to.deep.equal(expected);
    });
  });
});
