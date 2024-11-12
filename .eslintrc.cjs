module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard', 'eslint:recommended', 'plugin:jest/recommended'],
  overrides: [
    {
      env: {
        node: true,
        'jest/globals': true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['jest']
}
