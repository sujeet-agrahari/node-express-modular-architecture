const express = require('express');

const app = express();

const cors = require('cors');

// error handler
require('express-async-errors');

const { errorHandler, badJsonHandler, notFoundHandler } = require('./middlewares');

// error logger

const logger = require('../src/utils/logger');

// enable cors
app.use(cors());

// parse json body
app.use(express.json());

// handle bad json format
app.use(badJsonHandler);

// load routes
require('./loaders/routes')(app);

// load and validate env variables
require('./loaders/config');

// handle 404 not found error
app.use(notFoundHandler);

// log error
app.use(logger);

// catch all errors
app.use(errorHandler);

module.exports = app;
