import AppHealthService from './app-health.service.js'
import { generateResponse } from '../../utils/helper.js'

/**
 * Controller for handling application health-related requests.
 */
const AppHealthController = {
  /**
   * Retrieves the health status of the application.
   *
   * @param {Object} httpRequest - The HTTP request object.
   * @returns {Promise<Object>} The response object containing application health data.
   */
  getAppHealth: async (httpRequest) => {
    const appHealthData = await AppHealthService.doGetAppHealth(httpRequest)
    return generateResponse(appHealthData)
  }
}

export default AppHealthController
