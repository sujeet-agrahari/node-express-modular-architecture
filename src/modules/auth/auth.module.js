import { Router } from 'express'
import { makeExpressCallback, makeValidatorCallback } from '../../middlewares/index.js'
import AuthValidator from './auth.validator.js'
import AuthService from './auth.service.js'
import AuthController from './auth.controller.js'
import createRoutes from './auth.routes.js'

/**
 * Initializes the router and sets up the routes for the authentication module.
 */
const router = Router()

/**
 * Sets up the routes for the authentication module.
 * @param {Object} dependencies - The dependencies required for setting up the routes.
 * @param {Router} dependencies.router - The Express router.
 * @param {Object} dependencies.AuthController - The authentication controller.
 * @param {Object} dependencies.AuthValidator - The authentication validator.
 * @param {Function} dependencies.makeValidatorCallback - Middleware for validation.
 * @param {Function} dependencies.makeExpressCallback - Middleware for handling Express callbacks.
 * @returns {Router} - The configured router.
 */
const routes = createRoutes({
  router,
  AuthController,
  AuthValidator,
  makeValidatorCallback,
  makeExpressCallback
})

export {
  AuthController,
  AuthService,
  routes as AuthRoutes
}
