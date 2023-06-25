const httpStatus = require('./httpStatus');

/**
 * Get the ID parameter from a request object.
 * @param {object} req - The request object.
 * @returns {number} - The ID parameter as a number.
 * @throws {TypeError} - If the ID parameter is not a valid number.
 */
function getIdParam(req) {
  const { id } = req.params;
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10);
  }
  throw new TypeError(`Invalid ':id' param: "${id}"`);
}

/**
 * Generates a response object with the provided data and status code.
 *
 * @param {*} data - The data to include in the response.
 * @param {number} [statusCode=200] - The status code for the response (default: 200).
 * @returns {Object} The response object containing the data and status code.
 */
function generateResponse(data, statusCode = httpStatus.OK) {
  return {
    statusCode,
    data,
  };
}

module.exports = { getIdParam, generateResponse };
