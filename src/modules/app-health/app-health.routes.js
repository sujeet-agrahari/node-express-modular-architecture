/**
 * Sets up the app health routes.
 *
 * @param {Object} dependencies - The dependencies object.
 * @param {Object} dependencies.router - The Express router instance.
 * @param {Object} dependencies.AppHealthController - The app health controller.
 * @param {Function} dependencies.makeExpressCallback - The function to create an Express callback.
 * @returns {Object} The configured router.
 */
export default ({ router, AppHealthController, makeExpressCallback }) => {
  router.get('/', makeExpressCallback(AppHealthController.getAppHealth))
  return router
}
