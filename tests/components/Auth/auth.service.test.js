const sinon = require('sinon');
const { faker } = require('@faker-js/faker');
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { NotFoundError } from '../../../src/utils/api-errors';
const bcrypt = require('bcryptjs');
const JwtService = require('../../../src/components/Auth/jwt.service');
const AuthService = require('../../../src/components/Auth/auth.service');
const { generateJWT } = require('../../../src/components/Auth/jwt.service');
const { User } = require('../../../src/db/models');
const fakeUser = require('../../fixtures/user.fixture');

describe('AuthService Tests', async () => {
  let sandbox;

  const payload = {
    userId: fakeUser.id,
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

  describe('doLogin', () => {
    it('should throw NotFoundError if user does not exist', async () => {
      // Arrange
      const requestBody = {
        phone: faker.phone.phoneNumber('##########'),
        password: faker.internet.password(8)
      };

      const expected = new NotFoundError('User not found');

      sandbox.stub(User, 'findOne').resolves(null);

      // Act
      const resultFn = async () => {
        await AuthService.doLogin(requestBody);
      };

      // Assert
      expect(resultFn).rejects.toThrow(expected);
    });

    it('should login user and return token', async () => {
      // Arrange
      const requestBody = {
        phone: faker.phone.phoneNumber('##########'),
        password: faker.internet.password(8)
      };

      const expected = {
        ...payload,
        accessToken: jwtToken
      };

      sandbox.stub(User, 'findOne').resolves(fakeUser);
      sandbox.stub(bcrypt, 'compareSync').returns(true);
      sandbox.stub(JwtService, 'generateJWT').resolves(jwtToken);

      // Act
      const result = await AuthService.doLogin(requestBody);

      // Assert
      expect(result).to.deep.equal(expected);
    });
  });
});
