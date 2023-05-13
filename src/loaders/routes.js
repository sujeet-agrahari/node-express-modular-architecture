// Routes
const { API_PREFIX } = require('config');
const { AuthRoutes } = require('../modules/auth/auth.module');

const routes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

/**
 *
 * @param app
 */
module.exports = (app) => {
  routes.forEach((route) => {
    app.use(API_PREFIX + route.path, route.route);
  });
};
