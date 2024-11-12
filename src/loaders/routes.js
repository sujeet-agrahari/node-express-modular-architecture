// Routes
import config from 'config'
import { AuthRoutes } from '../modules/auth/auth.module.js'
import { AppHealthRoutes } from '../modules/app-health/app-health.module.js'

const routes = [
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    excludeAPIPrefix: true,
    path: '/health',
    route: AppHealthRoutes
  }
]

/**
 * Register routes with the app
 * @param {object} app - The Express app object
 */
const registerRoutes = (app) => {
  routes.forEach(({ path, route, excludeAPIPrefix }) => {
    // If excludeAPIPrefix is true, use the path as is.
    // Otherwise, prepend the API_PREFIX to the path.
    const routePath = excludeAPIPrefix ? path : config.API_PREFIX + path
    // Mount the route on the app using the determined route path.
    app.use(routePath, route)
  })
}

export default registerRoutes
