const errorHandler = require('./error');
const badJsonHandler = require('./validate-json');
const auth = require('./auth');
const authorize = require('./authorize');


module.exports = {
  errorHandler,
  badJsonHandler,
  auth,
  authorize,
};
