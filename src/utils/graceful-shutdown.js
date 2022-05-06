const { sequelize } = require('../db/models');
const { log } = require('../support/logger');

module.exports = async (server) => {
  try {
    await sequelize.close();
    log.info('Closed database connection!');
    await server.close();
    process.exit();
  } catch (error) {
    log.error(error.message);
    process.exit(1);
  }
};
