import httpStatus from './httpStatus.js'
import fs from 'fs'
import path from 'path'

/**
 * Get the ID parameter from a request object.
 * @param {object} req - The request object.
 * @param {object} req.params - The parameters of the request.
 * @param {string} req.params.id - The ID parameter as a string.
 * @returns {number} - The ID parameter as a number.
 * @throws {TypeError} - If the ID parameter is not a valid number.
 */
export function getIdParam (req) {
  const { id } = req.params
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10)
  }
  throw new TypeError(`Invalid ':id' param: "${id}"`)
}

/**
 * Generates a response object with the provided data and status code.
 *
 * @param {*} data - The data to include in the response.
 * @param {number} [statusCode=httpStatus.OK] - The status code for the response (default: 200).
 * @returns {Object} The response object containing the data and status code.
 */
export function generateResponse (data, statusCode = httpStatus.OK) {
  return {
    statusCode,
    data
  }
}

/**
 * Reads a JSON file synchronously and parses its content.
 *
 * @param {string} filePath - The path to the JSON file.
 * @returns {Object} The parsed JSON content.
 * @throws {Error} If the file cannot be read or parsed.
 */
export const readJsonFileSync = (filePath) => {
  const absolutePath = path.resolve(filePath)
  const fileContent = fs.readFileSync(absolutePath, 'utf-8')
  return JSON.parse(fileContent)
}
