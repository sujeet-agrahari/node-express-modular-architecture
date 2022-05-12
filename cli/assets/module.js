const router = require('express').Router();

const { makeExpressCallback, makeValidatorCallback } = require('../../middlewares');

// validator
const <%= name %>Validator = require('./<%= nameLower %>.validator');

// service
const <%= name %>Service = require('./<%= nameLower %>.service');

// controller
const <%= name %>Controller = require('./<%= nameLower %>.controller');

// routes
const routes = require('./<%= nameLower %>.routes')({
  router,
  <%= name %>Controller,
  <%= name %>Validator,
  makeValidatorCallback,
  makeExpressCallback
});

module.exports = {
  <%= name %>Controller,
  <%= name %>Service,
  <%= name %>Routes: routes
};
