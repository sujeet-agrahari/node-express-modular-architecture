const AppHealthService = require('./app-health.service');
const helper = require('../../utils/helper');

const AppHealthController = {
  /**
   *
   */
  getAppHealth: async (httpRequest) => {
    const appHealthData = await AppHealthService.doGetAppHealth(httpRequest);
    return helper.generateResponse(appHealthData);
  },
};

module.exports = AppHealthController;
