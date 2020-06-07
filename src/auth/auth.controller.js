
const login = (doCheckUserExist, doLogin) => async (httpRequest) => {
  const { username, password } = httpRequest.body;
  const userData = await doCheckUserExist({ username });
  // do login
  const loginData = {
    username,
    role: userData.role_id,
    passedPassword: password,
    actualPassword: userData.password,
  };
  const loginResult = await doLogin(loginData);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Successfully logged in!',
      data: loginResult,
    },
  };
};

const register = ({ BadRequestError, doCheckUserExist, doRegister }) => async (httpRequest) => {
  const { username, password } = httpRequest.body;
  try {
    await doCheckUserExist({ username });
  } catch (error) {
    // user doesn't exist
    const registerResult = await doRegister({ username, password });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Registered successfully!',
        data: registerResult,
      },
    };
  }
  throw new BadRequestError('User already exist!');
};

module.exports = { register, login };
