const normalizePort = require('../../src/utils/normalize-port');

describe('normalizePort', () => {
  it('should return a number if the port value is a valid number', () => {
    expect.assertions(1);

    const result = normalizePort('3000');
    expect(result).toBe(3000);
  });

  it('should return the port value as a string if it is not a valid number', () => {
    expect.assertions(1);

    const result = normalizePort('socket');
    expect(result).toBe('socket');
  });

  it('should return false if the port value is a negative number', () => {
    expect.assertions(1);

    const result = normalizePort('-5000');
    expect(result).toBe(false);
  });
});
