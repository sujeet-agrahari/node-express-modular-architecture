const AuthService = require('./auth.service');
const helper = require('../../utils/helper');

const AuthController = {
  /**
   * Handle logging in user.
   * @async
   * @function
   * @param {ExpressRequest} httpRequest incoming http request
   * @returns {Promise.<ControllerResponse> }
   */
  login: async (httpRequest) => {
    const loginData = await AuthService.doLogin(httpRequest.body);
    return helper.generateResponse(loginData);
  },
};

module.exports = AuthController;
