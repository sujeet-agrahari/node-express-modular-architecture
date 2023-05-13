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

module.exports = { getIdParam };
