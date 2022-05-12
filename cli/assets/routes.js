module.exports = ({ router, <%= name %>Controller, <%= name %>Validator, makeValidatorCallback, makeExpressCallback }) => {
  router.get(
    '/',
    makeValidatorCallback(<%= name %>Validator.validateLogin),
    makeExpressCallback(<%= name %>Controller.getResource)
  );
  return router;
};
