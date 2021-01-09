const { sequelize } = require('../db');

module.exports = async (server) => {
  try {
    await sequelize.close();
    console.info('Closed database connection!');
    await server.close();
    process.exit();
  } catch (error) {
    console.info(error.message);
    process.exit(1);
  }
};