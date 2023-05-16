/**
 *
 */
module.exports = ({ router, AppHealthController, makeExpressCallback }) => {
  router.get('/', makeExpressCallback(AppHealthController.getResource));
  return router;
};
