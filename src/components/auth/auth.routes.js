module.exports = ({ router, AuthController, AuthValidator, makeValidatorCallback, makeExpressCallback }) => {
  router.post(
    '/register',
    makeValidatorCallback(AuthValidator.validateBody),
    makeExpressCallback(AuthController.register)
  );

  router.post('/login', makeExpressCallback(AuthController.login));
  return router;
};
