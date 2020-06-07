const router = require('express').Router();


const { doRegister, doLogin, doCheckUserExist } = require('./auth.service');
const makeExpressCallback = require('../utils/express-callback');

const { BadRequestError } = require('../utils/api-errors');


// controller
const controller = require('./auth.controller');

const register = controller.register({ BadRequestError, doCheckUserExist, doRegister });
const login = controller.login({ doCheckUserExist, doLogin });

const AuthController = { register, login };

// routes
const routes = require('./auth.routes')({ AuthController, router, makeExpressCallback });

module.exports = {
  AuthController,
  AuthService: {
    doCheckUserExist,
    doLogin,
    doRegister,
  },
  AuthRoutes: routes,
};
