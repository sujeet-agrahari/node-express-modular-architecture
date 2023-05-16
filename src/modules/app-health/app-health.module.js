const router = require('express').Router();

const { makeExpressCallback } = require('../../middlewares');

// service
const AppHealthService = require('./app-health.service');

// controller
const AppHealthController = require('./app-health.controller');

// routes
const routes = require('./app-health.routes')({
  router,
  AppHealthController,
  makeExpressCallback,
});

module.exports = {
  AppHealthController,
  AppHealthService,
  AppHealthRoutes: routes,
};
