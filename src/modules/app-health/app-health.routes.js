/**
 *
 */
module.exports = ({ router, AppHealthController, makeExpressCallback }) => {
  router.get('/', makeExpressCallback(AppHealthController.getAppHealth));
  return router;
};
