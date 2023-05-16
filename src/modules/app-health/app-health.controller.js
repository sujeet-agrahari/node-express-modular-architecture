const AppHealthService = require('./app-health.service');

const AppHealthController = {
  /**
   *
   */
  getResource: async (httpRequest) => {
    const appHealthData = await AppHealthService.doGetAppHealthStatus(
      httpRequest
    );
    console.log(appHealthData);
    return {
      statusCode: 200,
      data: appHealthData,
    };
  },
};

module.exports = AppHealthController;
