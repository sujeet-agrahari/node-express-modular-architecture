const bcrypt = require('bcryptjs');

const { faker } = require('@faker-js/faker');

const AuthService = require('../../../src/modules/auth/auth.service');
const JwtService = require('../../../src/modules/auth/jwt.service');

jest.mock('../../../src/db/models/User', () => {
  const User = {
    findOne: jest.fn().mockResolvedValue({ id: 'fake-id', role: 'fake-role' }),
  };
  return User;
});

describe('AuthService', () => {
  describe('login', () => {
    it('should login user and return token', async () => {
      // Arrange
      expect.assertions(1);
      const requestBody = {
        phone: faker.phone.phoneNumber('##########'),
        password: faker.internet.password(8),
      };
      const fakeUser = {
        userId: 'fake-id',
        role: 'fake-role',
      };
      const fakeAccessToken = 'fake-access-token';
      jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true);
      jest.spyOn(JwtService, 'generateJWT').mockResolvedValue(fakeAccessToken);

      const expected = {
        ...fakeUser,
        accessToken: fakeAccessToken,
      };

      // Act
      const result = await AuthService.doLogin(requestBody);

      // Assert
      expect(result).toEqual(expected);
    });
  });
});
