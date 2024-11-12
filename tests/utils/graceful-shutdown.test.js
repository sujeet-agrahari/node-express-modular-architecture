import { sequelize } from '../../src/db/models'
import { logger } from '../../src/support/logger'
import gracefulShutdown from '../../src/utils/graceful-shutdown'

/**
 * Tests for gracefulShutdown utility function.
 */
describe('gracefulShutdown', () => {
  let server
  let exitSpy
  let sequelizeCloseSpy
  let loggerInfoSpy
  let loggerErrorSpy

  beforeEach(() => {
    server = {
      close: jest.fn()
    }
    exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {})
    sequelizeCloseSpy = jest.spyOn(sequelize, 'close')
    loggerInfoSpy = jest.spyOn(logger, 'info').mockImplementation(() => {})
    loggerErrorSpy = jest.spyOn(logger, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    exitSpy.mockRestore()
    sequelizeCloseSpy.mockRestore()
    loggerInfoSpy.mockRestore()
    loggerErrorSpy.mockRestore()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  /**
   * Test to ensure gracefulShutdown closes the server and database connections and exits the process.
   */
  it('should close the server and database connections and exit the process', async () => {
    expect.assertions(3)
    await gracefulShutdown(server)
    sequelizeCloseSpy.mockResolvedValueOnce()
    expect(sequelizeCloseSpy).toHaveBeenCalledTimes(1)
    expect(loggerInfoSpy).toHaveBeenCalledWith('Closed database connection!')
    expect(exitSpy).toHaveBeenCalledWith()
  })

  /**
   * Test to ensure gracefulShutdown logs and exits with an error if an error occurs.
   */
  it('should log and exit with an error if an error occurs', async () => {
    expect.assertions(2)
    const error = new Error('Test error')
    sequelizeCloseSpy.mockRejectedValueOnce(error)
    await gracefulShutdown(server)
    expect(loggerErrorSpy).toHaveBeenCalledWith('Test error')
    expect(exitSpy).toHaveBeenCalledWith(1)
  })
})
