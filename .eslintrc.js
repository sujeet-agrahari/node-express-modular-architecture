module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    vitest: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    semi: 2,
    quotes: [2, 'single'],
    'import/no-extraneous-dependencies': [0],
    'arrow-body-style': [0],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        printWidth: 120,
        tabWidth: 2
      }
    ]
  }
};
