const { sequelize } = require('../db/models');
const logger = require('../support/logger');

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
