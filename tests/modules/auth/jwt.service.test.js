const jwt = require('jsonwebtoken');
const { JWT_ACCESS_TOKEN_SECRET, JWT_SIGN_OPTIONS } = require('config');
const { BadRequestError } = require('../../../src/utils/api-errors');
const {
  generateJWT,
  verifyJWT,
} = require('../../../src/modules/auth/jwt.service');

jest.mock('jsonwebtoken');

describe('generateJWT', () => {
  it('should generate a JWT token with the provided payload', async () => {
    expect.assertions(2);

    const payload = { userId: '123', role: 'user' };
    const expectedToken = 'Bearer generated-token';

    jwt.sign.mockReturnValueOnce('generated-token');

    const token = await generateJWT({ payload });

    expect(jwt.sign).toHaveBeenCalledWith(
      payload,
      JWT_ACCESS_TOKEN_SECRET,
      JWT_SIGN_OPTIONS
    );
    expect(token).toBe(expectedToken);
  });

  it('should throw a BadRequestError if there is an error generating the token', async () => {
    expect.assertions(2);

    const payload = { userId: '123', role: 'user' };
    const expectedError = new Error('Token generation error');

    jwt.sign.mockImplementationOnce(() => {
      throw expectedError;
    });

    await expect(generateJWT({ payload })).rejects.toThrow(BadRequestError);
    expect(jwt.sign).toHaveBeenCalledWith(
      payload,
      JWT_ACCESS_TOKEN_SECRET,
      JWT_SIGN_OPTIONS
    );
  });
});

describe('verifyJWT', () => {
  it('should verify a JWT token and return the decoded data', async () => {
    expect.assertions(2);

    const token = 'Bearer valid-token';
    const expectedData = { userId: '123', role: 'user' };

    jwt.verify.mockReturnValueOnce(expectedData);

    const data = await verifyJWT({ token });

    expect(jwt.verify).toHaveBeenCalledWith(
      token,
      JWT_ACCESS_TOKEN_SECRET,
      JWT_SIGN_OPTIONS
    );
    expect(data).toBe(expectedData);
  });

  it('should throw a BadRequestError if there is an error verifying the token', async () => {
    expect.assertions(2);

    const token = 'Bearer invalid-token';
    const expectedError = new Error('Token verification error');

    jwt.verify.mockImplementationOnce(() => {
      throw expectedError;
    });

    await expect(verifyJWT({ token })).rejects.toThrow(BadRequestError);
    expect(jwt.verify).toHaveBeenCalledWith(
      token,
      JWT_ACCESS_TOKEN_SECRET,
      JWT_SIGN_OPTIONS
    );
  });
});
