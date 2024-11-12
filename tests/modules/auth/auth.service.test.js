import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'

import AuthService from '../../../src/modules/auth/auth.service'
import JwtService from '../../../src/modules/auth/jwt.service'

jest.mock('../../../src/db/models/User', () => {
  const User = {
    findOne: jest.fn().mockResolvedValue({ id: 'fake-id', role: 'fake-role' })
  }
  return User
})

/**
 * Test suite for AuthService
 */
describe('AuthService', () => {
  /**
   * Test case for login method
   */
  describe('login', () => {
    it('should login user and return token', async () => {
      // Arrange
      expect.assertions(1)
      const requestBody = {
        phone: faker.phone.phoneNumber('##########'),
        password: faker.internet.password(8)
      }
      const fakeUser = {
        userId: 'fake-id',
        role: 'fake-role'
      }
      const fakeAccessToken = 'fake-access-token'
      jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true)
      jest.spyOn(JwtService, 'generateJWT').mockResolvedValue(fakeAccessToken)
      jest.spyOn(AuthService, 'doLogin').mockResolvedValue({
        userId: fakeUser.userId,
        role: fakeUser.role,
        accessToken: fakeAccessToken
      })
      const expected = {
        ...fakeUser,
        accessToken: fakeAccessToken
      }

      // Act
      const result = await AuthService.doLogin(requestBody)

      // Assert
      expect(result).toEqual(expected)
    })
  })
})
