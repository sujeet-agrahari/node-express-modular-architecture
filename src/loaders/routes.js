// Routes
const {
  AuthRoutes,
} = require('../auth/auth.module');


module.exports = function getRoutes(app) {
  // ........................ Auth Routes ........................

  app.use('/api/v1/auth', AuthRoutes);
};
