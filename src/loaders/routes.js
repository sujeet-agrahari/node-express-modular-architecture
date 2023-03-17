// Routes
const { API_PREFIX } = require('config');
const { AuthRoutes } = require('../modules/Auth/auth.module');

const routes = [
  {
    path: '/auth',
    route: AuthRoutes
  }
];

module.exports = (app) => {
  routes.forEach((route) => {
    app.use(API_PREFIX + route.path, route.route);
  });
};
