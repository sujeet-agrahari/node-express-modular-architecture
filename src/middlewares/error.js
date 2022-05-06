const { APIError } = require('../utils/api-errors');

module.exports = async (err, req, res) => {
  // catch all api errors
  if (err instanceof APIError) {
    return res.status(err.status).send({
      success: false,
      message: err.message
    });
  }
  // connect all errors
  return res.status(500).send({
    success: false,
    message: 'Something went wrong!'
  });
};
