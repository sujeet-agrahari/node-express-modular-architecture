const { getIdParam } = require('../../src/utils/helper');

describe('getIdParam', () => {
  it('should return the ID parameter as a number', () => {
    expect.assertions(1);

    const req = {
      params: {
        id: '12345',
      },
    };
    const result = getIdParam(req);
    expect(result).toBe(12345);
  });

  it('should throw a TypeError if the ID parameter is not a valid number', () => {
    expect.assertions(1);

    const req = {
      params: {
        id: 'abc',
      },
    };
    expect(() => getIdParam(req)).toThrow(TypeError);
  });

  it('should throw a TypeError with the correct error message', () => {
    expect.assertions(1);

    const req = {
      params: {
        id: 'abc',
      },
    };
    expect(() => getIdParam(req)).toThrow('Invalid \':id\' param: "abc"');
  });
});
