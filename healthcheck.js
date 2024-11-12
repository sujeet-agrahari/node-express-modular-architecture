/* eslint-disable no-console */

/**
 * Checks the health status of the application.
 * It sends a GET request to the health endpoint and validates the response.
 * Logs the health status of the application.
 */
export const checkAppHealth = async () => {
  try {
    const response = await fetch(`http://localhost:${process.env.PORT}/health`)
    const appHealthStatus = await response.json()

    // Validate app health status
    if (
      appHealthStatus.database.status === 'up' &&
      appHealthStatus.app.status === 'up'
    ) {
      console.log('App is up and running')
      // Additional actions if the app is healthy
    } else {
      console.error('App is not healthy')
      // Additional actions if the app is not healthy
    }
  } catch (error) {
    console.error('Error occurred while checking app health:', error)
    // Additional actions if an error occurred while checking app health
  }
}

checkAppHealth()
