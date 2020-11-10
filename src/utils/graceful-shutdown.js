const { sequelize } = require('../db');

module.exports = (server) => {
  sequelize.close()
    .then((data) => console.info('Closed database connection'))
    .catch((err) => console.info('Error closing database connection', err));
  server.close((err) => {
    if (err) {
      console.info(err);
      process.exitCode = 1;
    }
    process.exit();
  });
};
