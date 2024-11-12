import { faker } from '@faker-js/faker'
import config from 'config'
import AuthController from '../../../src/modules/auth/auth.controller'
import AuthService from '../../../src/modules/auth/auth.service'
import JwtService from '../../../src/modules/auth/jwt.service'

/**
 * Tests for AuthController
 */
describe('AuthController', () => {
  const payload = {
    userId: faker.datatype.uuid(),
    role: 'User'
  }

  let jwtToken

  /**
   * Generate JWT token before all tests
   */
  beforeAll(async () => {
    jwtToken = await JwtService.generateJWT({
      payload,
      secretKey: config.JWT_ACCESS_TOKEN_SECRET
    })
  })

  /**
   * Restore mocks after each test
   */
  afterEach(() => {
    jest.restoreAllMocks()
  })

  /**
   * Tests for login method
   */
  describe('login', () => {
    it('should login user and return token', async () => {
      expect.assertions(2)
      // Arrange
      const httpRequest = {
        body: {
          phone: faker.phone.phoneNumber('##########'),
          password: faker.internet.password(8)
        }
      }

      const loginData = {
        ...payload,
        accessToken: jwtToken
      }

      const expected = {
        statusCode: 200,
        data: loginData
      }

      const doLoginMock = jest.fn().mockResolvedValue(loginData)
      AuthService.doLogin = doLoginMock

      // Act
      const result = await AuthController.login(httpRequest)

      // Assert
      expect(result).toEqual(expected)
      expect(doLoginMock).toHaveBeenCalledWith(httpRequest.body)
    })
  })
})
