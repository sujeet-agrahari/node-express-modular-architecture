/**
 * Normalize a port into a number, string, or false.
 * @param {string} val - The port value to normalize.
 * @returns {(number|string|false)} - The normalized port value.
 */
module.exports = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};
