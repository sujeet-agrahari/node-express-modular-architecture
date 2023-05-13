const { sequelize } = require('../db/models');
const logger = require('../support/logger');

/**
 * Close the server and database connections and exit the process.
 * @param {object} server - The server object to close.
 * @returns {Promise<void>} - A promise that resolves when the server and database connections are closed and the process is exited.
 */
module.exports = async (server) => {
  try {
    await sequelize.close();
    logger.info('Closed database connection!');
    await server.close();
    process.exit();
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};
