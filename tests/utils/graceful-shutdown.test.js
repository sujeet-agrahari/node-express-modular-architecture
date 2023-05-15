const { sequelize } = require('../../src/db/models');
const logger = require('../../src/support/logger');
const gracefulShutdown = require('../../src/utils/graceful-shutdown');

describe('gracefulShutdown', () => {
  let server;
  let exitSpy;
  let sequelizeCloseSpy;
  let loggerInfoSpy;
  let loggerErrorSpy;

  beforeEach(() => {
    server = {
      close: jest.fn(),
    };
    exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    sequelizeCloseSpy = jest.spyOn(sequelize, 'close');
    loggerInfoSpy = jest.spyOn(logger, 'info').mockImplementation(() => {});
    loggerErrorSpy = jest.spyOn(logger, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    exitSpy.mockRestore();
    sequelizeCloseSpy.mockRestore();
    loggerInfoSpy.mockRestore();
    loggerErrorSpy.mockRestore();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should close the server and database connections and exit the process', async () => {
    expect.assertions(3);
    await gracefulShutdown(server);
    sequelizeCloseSpy.mockResolvedValueOnce();
    expect(sequelizeCloseSpy).toHaveBeenCalledTimes(1);
    expect(loggerInfoSpy).toHaveBeenCalledWith('Closed database connection!');
    expect(exitSpy).toHaveBeenCalledWith();
  });

  it('should log and exit with an error if an error occurs', async () => {
    expect.assertions(2);
    const error = new Error('Test error');
    sequelizeCloseSpy.mockRejectedValueOnce(error);
    await gracefulShutdown(server);
    expect(loggerErrorSpy).toHaveBeenCalledWith('Test error');
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
