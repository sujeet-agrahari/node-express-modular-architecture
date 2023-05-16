const { sequelize } = require('../../db/models');

const AppHealthService = {
  /**
   *
   */
  doGetAppHealthStatus: async () => {
    const appHealthStatus = {
      database: { status: 'down' },
      app: { status: 'down' },
    };

    try {
      await sequelize.authenticate();
      appHealthStatus.database.status = 'up';
    } catch (error) {
      // Database connection error
      appHealthStatus.database.status = 'down';
    }

    appHealthStatus.app.status = 'up';

    return appHealthStatus;
  },
};

module.exports = AppHealthService;
