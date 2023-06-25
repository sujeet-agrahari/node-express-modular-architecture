/* eslint-disable no-console */
const axios = require('axios');

/**
 *
 */
const checkAppHealth = async () => {
  try {
    const response = await axios.get('http://localhost:3000/health');
    const appHealthStatus = response.data;

    // Validate app health status
    if (
      appHealthStatus.database.status === 'up' &&
      appHealthStatus.app.status === 'up'
    ) {
      console.log('App is up and running');
      // Additional actions if the app is healthy
    } else {
      console.error('App is not healthy');
      // Additional actions if the app is not healthy
    }
  } catch (error) {
    console.error('Error occurred while checking app health:', error);
    // Additional actions if an error occurred while checking app health
  }
};

checkAppHealth();
