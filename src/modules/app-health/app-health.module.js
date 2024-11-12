import { Router } from 'express'
import { makeExpressCallback } from '../../middlewares/index.js'
import AppHealthService from './app-health.service.js'
import AppHealthController from './app-health.controller.js'
import createRoutes from './app-health.routes.js'

/**
 * Module for handling application health-related functionality.
 * @module AppHealthModule
 */

// Initialize the router
const router = Router()

// Initialize routes with dependencies
const routes = createRoutes({
  router,
  AppHealthController,
  makeExpressCallback
})

export {
  AppHealthController,
  AppHealthService,
  routes as AppHealthRoutes
}
