module.exports = {
  setupFiles: ['./tests/settings/env-setup.js'],
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
