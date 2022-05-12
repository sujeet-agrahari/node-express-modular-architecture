// Routes
const { AuthRoutes } = require('../components/Auth/auth.module');

module.exports = function getRoutes(app) {
  app.use('/api/v1/auth', AuthRoutes);
};
