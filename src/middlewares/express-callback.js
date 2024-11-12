/**
 * Middleware to handle Express callback for a given controller.
 *
 * @param {Function} controller - The controller function to handle the HTTP request.
 * @returns {Function} - An asynchronous function to handle the Express request and response.
 */
const expressCallback = (controller) => async (req, res) => {
  const httpRequest = {
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip,
    method: req.method,
    path: req.path,
    headers: {
      'Content-Type': req.get('Content-Type'),
      Authorization: req.get('Authorization'),
      Referer: req.get('referer'),
      'User-Agent': req.get('User-Agent')
    }
  }
  const httpResponse = await controller(httpRequest)
  if (httpResponse.headers) res.set(httpResponse.headers)
  return res.status(httpResponse.statusCode).json(httpResponse.data)
}

export default expressCallback
