const router = require('express').Router();

const { makeExpressCallback, makeValidatorCallback } = require('../../middlewares');

// validator
const AuthValidator = require('./auth.validator');

// service
const { doRegister, doLogin, doCheckUserExist } = require('./auth.service');

const { BadRequestError } = require('../../utils/api-errors');

// controller
const controller = require('./auth.controller');

const register = controller.register({ BadRequestError, doCheckUserExist, doRegister });
const login = controller.login({ doCheckUserExist, doLogin });

const AuthController = { register, login };

// routes
const routes = require('./auth.routes')({
  router,
  AuthController,
  AuthValidator,
  makeValidatorCallback,
  makeExpressCallback
});

module.exports = {
  AuthController,
  AuthService: {
    doCheckUserExist,
    doLogin,
    doRegister
  },
  AuthRoutes: routes
};
