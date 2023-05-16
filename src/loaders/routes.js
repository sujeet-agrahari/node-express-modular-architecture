// Routes
const { API_PREFIX } = require('config');
const { AuthRoutes } = require('../modules/auth/auth.module');
const { AppHealthRoutes } = require('../modules/app-health/app-health.module');

const routes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    excludeAPIPrefix: true,
    path: '/health',
    route: AppHealthRoutes,
  },
];

/**
 * Register routes with the app
 * @param {object} app - The Express app object
 */
module.exports = (app) => {
  routes.forEach(({ path, route, excludeAPIPrefix }) => {
    // If excludeAPIPrefix is true, use the path as is.
    // Otherwise, prepend the API_PREFIX to the path.
    const routePath = excludeAPIPrefix ? path : API_PREFIX + path;
    // Mount the route on the app using the determined route path.
    app.use(routePath, route);
  });
};
