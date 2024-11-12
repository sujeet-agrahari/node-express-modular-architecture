import AuthService from './auth.service.js'
import { generateResponse } from '../../utils/helper.js'

const AuthController = {
  /**
   * Handle logging in user.
   * @async
   * @function
   * @param {ExpressRequest} httpRequest incoming http request
   * @returns {Promise.<ControllerResponse> }
   */
  login: async (httpRequest) => {
    const loginData = await AuthService.doLogin(httpRequest.body)
    return generateResponse(loginData)
  }
}

export default AuthController
