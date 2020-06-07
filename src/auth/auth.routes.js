
module.exports = ({ AuthController, router, makeExpressCallback }) => {
  router.post('/register', makeExpressCallback(AuthController.register));
  router.post('/login', makeExpressCallback(AuthController.login));
  return router;
};
