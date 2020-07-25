const express = require('express');

const app = express();

const cors = require('cors');

// error handler
require('express-async-errors');

const { errorHandler, badJsonHandler } = require('./middlewares');

// load environment config variables
require('dotenv').config();

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
app.use((req, res) => res.status(404).send({
  status: false,
  message: `Sorry, requested URL ${req.method} ${req.url} not found!`,
}));

// catch all errors
app.use(errorHandler);

module.exports = app;
