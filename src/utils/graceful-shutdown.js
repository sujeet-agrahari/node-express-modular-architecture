import { sequelize } from '../db/models/index.js'
import { logger } from '../support/logger.js'

/**
 * Close the server and database connections and exit the process.
 * @param {import('http').Server} server - The server object to close.
 * @returns {Promise<void>} - A promise that resolves when the server and database connections are closed and the process is exited.
 */
const gracefulShutdown = async (server) => {
  try {
    await sequelize.close()
    logger.info('Closed database connection!')
    await server.close()
    process.exit()
  } catch (error) {
    logger.error(error.message)
    process.exit(1)
  }
}

export default gracefulShutdown
