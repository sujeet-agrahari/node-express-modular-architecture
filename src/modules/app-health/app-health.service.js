import { sequelize } from '../../db/models/index.js'

/**
 * Service to check the health status of the application and its database.
 */
const AppHealthService = {
  /**
   * Checks the health status of the application and its database.
   * @returns {Promise<Object>} An object containing the health status of the app and database.
   */
  doGetAppHealth: async () => {
    const appHealthStatus = {
      database: { status: 'down' },
      app: { status: 'down' }
    }

    try {
      await sequelize.authenticate()
      appHealthStatus.database.status = 'up'
    } catch (error) {
      // Database connection error
      appHealthStatus.database.status = 'down'
    }

    appHealthStatus.app.status = 'up'

    return appHealthStatus
  }
}

export default AppHealthService
