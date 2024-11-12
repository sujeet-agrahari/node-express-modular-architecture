/**
 *
 * @param {object} AuthRouter
 * @param {ExpressRouter} AuthRouter.router
 * @param {AuthController} AuthRouter.AuthController
 * @param {AuthValidator} AuthRouter.AuthValidator
 * @param {makeExpressCallback} AuthRouter.makeExpressCallback
 * @param {makeValidatorCallback} AuthRouter.makeValidatorCallback
 * @returns {ExpressRouter}
 */
export default ({
  router,
  AuthController,
  AuthValidator,
  makeValidatorCallback,
  makeExpressCallback
}) => {
  router.post(
    '/login',
    makeValidatorCallback(AuthValidator.validateLogin),
    makeExpressCallback(AuthController.login)
  )
  return router
}
